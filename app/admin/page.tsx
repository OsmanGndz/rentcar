"use client";
import React from "react";

const AdminPage = () => {
  // Admin sayfasına erişebilen kullanıcılar zaten middleware tarafından doğrulanmış

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Paneli</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Hoş geldin, Admin!</h2>
          <p className="text-gray-600">
            Bu admin paneline erişiminiz var. Burada admin işlemlerini
            gerçekleştirebilirsiniz.
          </p>

          {/* Admin panel içeriği buraya eklenecek */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900">Kullanıcı Yönetimi</h3>
              <p className="text-blue-700 text-sm mt-1">
                Kullanıcıları yönet ve roller atayın
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-900">Rezervasyonlar</h3>
              <p className="text-green-700 text-sm mt-1">
                Tüm rezervasyonları görüntüleyin
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-900">Araç Yönetimi</h3>
              <p className="text-purple-700 text-sm mt-1">
                Araç ekle, düzenle, sil
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
