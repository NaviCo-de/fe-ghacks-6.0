"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

type SanggarTari = {
  id: string;
  nama: string;
  tahunBerdiri: string;
  lokasi: string;
  deskripsi: string | null;
  foto: string | null;
  langitude?: number;
  longitude?: number;
  distance?: number;
};

const NearestSanggarPage = () => {
  const [userCity, setUserCity] = useState<string>("Detecting...");
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLon, setUserLon] = useState<number | null>(null);
  const [sanggarList, setSanggarList] = useState<SanggarTari[]>([]);
  const [selectedSanggar, setSelectedSanggar] = useState<SanggarTari | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Booking form
  const [dance, setDance] = useState("");
  const [instructor, setInstructor] = useState("");
  const [time, setTime] = useState("");
  const [participants, setParticipants] = useState("");

  // 1. Get User Location
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserCity("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLat(latitude);
        setUserLon(longitude);

        // Reverse geocode to get city
        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const city =
            res.data.address.city ||
            res.data.address.town ||
            res.data.address.village ||
            "Unknown City";
          setUserCity(city);
        } catch (err) {
          console.error("Reverse geocode failed:", err);
          setUserCity("Unknown Location");
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        setUserCity("Location Denied");
      }
    );
  }, []);

  // 2. Fetch Nearest Sanggar
  useEffect(() => {
    const fetchNearest = async () => {
      if (userLat && userLon) {
        try {
          const res = await axios.get("http://localhost:4000/sanggar-tari/nearest", {
            params: { userLat, userLon, limit: 5 },
          });
          setSanggarList(res.data);
        } catch (err) {
          console.error("Failed to fetch nearest sanggar:", err);
        }
      }
    };
    fetchNearest();
  }, [userLat, userLon]);

  // 3. Open Modals
  const openDetailModal = (sanggar: SanggarTari) => {
    setSelectedSanggar(sanggar);
    setIsDetailModalOpen(true);
  };

  const openBookingModal = (sanggar: SanggarTari) => {
    setSelectedSanggar(sanggar);
    setIsBookingModalOpen(true);
  };

  // 4. Handle Booking
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSanggar) return;

    try {
      await axios.post("http://localhost:4000/booking", {
        sanggarId: selectedSanggar.id,
        dance,
        instructor,
        time,
        participants,
      });
      alert("Booking successful!");
      setIsBookingModalOpen(false);
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Nearest Sanggar Tari</h1>
      <p className="mb-6 text-gray-700">
        Your Location: <span className="font-semibold">{userCity}</span>
      </p>

      {/* Sanggar List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sanggarList.map((sanggar) => (
          <div
            key={sanggar.id}
            className="p-4 bg-white border rounded-[8px] shadow-sm hover:shadow-md transition"
          >
            <img
              src={sanggar.foto || "/default.jpg"}
              alt={sanggar.nama}
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h2 className="text-xl font-semibold">{sanggar.nama}</h2>
            <p className="text-gray-600">{sanggar.lokasi}</p>
            <p className="text-gray-500 text-sm">
              Distance: {sanggar.distance?.toFixed(2)} km
            </p>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => openDetailModal(sanggar)}>Detail</Button>
              <Button
                onClick={() => openBookingModal(sanggar)}
                className="bg-green-600"
              >
                Book
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedSanggar && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-[8px] shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">{selectedSanggar.nama}</h2>
            <img
              src={selectedSanggar.foto || "/default.jpg"}
              alt={selectedSanggar.nama}
              className="w-full mb-3"
            />
            <p><strong>Lokasi:</strong> {selectedSanggar.lokasi}</p>
            <p><strong>Tahun Berdiri:</strong> {selectedSanggar.tahunBerdiri}</p>
            <p className="mt-2">{selectedSanggar.deskripsi}</p>
            <Button className="mt-4" onClick={() => setIsDetailModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && selectedSanggar && (
        <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-[8px] shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">
              Booking {selectedSanggar.nama}
            </h2>
            <form onSubmit={handleBooking} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Dance"
                className="border p-2"
                value={dance}
                onChange={(e) => setDance(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Instructor"
                className="border p-2"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Participants"
                className="border p-2"
                value={participants}
                onChange={(e) => setParticipants((e.target.value))}
                required
              />
              <Button type="submit" className="bg-green-600">
                Confirm Booking
              </Button>
            </form>
            <Button
              className="mt-3 bg-gray-500"
              onClick={() => setIsBookingModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearestSanggarPage;
