"use client";

import React from "react";

export function SimpleCanvas() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Demo Canvas</h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Simple canvas area where we can add game demos or other content
          </p>
        </div>

        {/* Simple Canvas Area */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-red-600 rounded-lg mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">🎮</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Canvas Ready
              </h3>
              <p className="text-gray-400">
                This is a clean space where we can add your game demos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
