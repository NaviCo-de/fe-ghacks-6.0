"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

// Dance descriptions
const danceDescriptions: Record<string, string> = {
  tortor:
    "Tari Tor-Tor adalah tarian tradisional Batak dari Sumatera Utara yang dibawakan pada acara adat dan penuh makna.",
  saman:
    "Tari Saman berasal dari Aceh, terkenal dengan gerakan tepukan tangan yang cepat dan kompak, disebut tarian seribu tangan.",
  jaipong:
    "Tari Jaipong dari Jawa Barat memiliki gerakan enerjik, dinamis, dan penuh keceriaan.",
  kecak:
    "Tari Kecak dari Bali dikenal dengan nyanyian ‘cak’ oleh puluhan penari, sering menceritakan kisah Ramayana.",
};

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setResult(null);

    try {
      // Simulate API
      const randomDances = ["tortor", "saman", "jaipong", "kecak"];
      const danceName =
        randomDances[Math.floor(Math.random() * randomDances.length)];
      const description = danceDescriptions[danceName];
      setTimeout(() => {
        setResult(
          `Tari ${danceName.charAt(0).toUpperCase() + danceName.slice(1)} – ${description}`
        );
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Upload failed:", error);
      setResult("Error processing file.");
      setLoading(false);
    }
  };

  return (
    <div className="my-20 flex flex-col items-center">
      <form
        onSubmit={handleUpload}
        className="flex flex-col justify-center items-center gap-10 w-full max-w-5xl"
      >
        <h1 className="text-primary-500 text-4xl font-playfair-display font-bold text-center">
          Temukan Tarian Tradisional Indonesia
        </h1>

        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />

        {/* Upload + Result Box */}
        <div className="relative w-full bg-white rounded-xl border border-neutral-gray shadow-lg overflow-hidden transition-all duration-700">
          <div
            className={`flex transition-all duration-700 ${
              result ? "flex-row" : "flex-col"
            }`}
            style={{ height: "420px" }}
          >
            {/* Upload Area */}
            <label
              htmlFor="file-upload"
              className={`flex justify-center items-center transition-all duration-700 ${
                result ? "w-1/2" : "w-full h-full"
              }`}
            >
              <div className="relative w-full h-full flex justify-center items-center p-4">
                {!file && (
                  <div className="w-3/4 h-3/4 border-2 border-dashed border-neutral-gray rounded-xl flex flex-col justify-center items-center gap-4 bg-white hover:scale-105 transition-transform duration-300">
                    <Image src="/upload.png" alt="upload" width={100} height={100} />
                    <p className="text-gray-600 text-center">
                      Drag or Upload Your File Here
                    </p>
                  </div>
                )}

                {file && file.type.startsWith("image/") && (
                  <div className="relative w-full h-full">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    {loading && (
                      <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm bg-black/40">
                        <Image
                          src="/Logo.png"
                          alt="Loading Logo"
                          width={80}
                          height={80}
                          className="animate-pulse"
                        />
                      </div>
                    )}
                  </div>
                )}

                {file && file.type.startsWith("video/") && (
                  <div className="relative w-full h-full">
                    <video
                      controls
                      className="w-full h-full object-cover rounded-xl"
                      src={URL.createObjectURL(file)}
                    />
                    {loading && (
                      <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm bg-black/40">
                        <Image
                          src="/Logo.png"
                          alt="Loading Logo"
                          width={80}
                          height={80}
                          className="animate-pulse"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </label>

            {/* Result Area */}
            {result && (
              <div className="w-1/2 flex items-center justify-center p-6 bg-gradient-to-br from-secondary-50 to-white transition-all duration-700 border-l border-neutral-gray">
                <h2 className="text-text-default text-3xl font-semibold leading-relaxed animate-fadeIn text-center">
                  {result}
                </h2>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-tertiary-100 border-tertiary-500 border-2 text-[#5D5500] px-6 py-2 rounded-xl transition-all hover:scale-105 hover:bg-tertiary-200"
          disabled={loading}
        >
          {loading ? "Processing..." : "Find!"}
        </button>
      </form>
    </div>
  );
};

export default Page;
