"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaCalendarCheck,
  FaCarSide,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
} from "react-icons/fa";

interface ReservationDetails {
  id: string;
  userId: string;
  carId: string;
  pickupLocation: string | null;
  giveupLocation: string | null;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

const ReservationDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [reservation, setReservation] = useState<ReservationDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/reservation/${params.id}`);
        const data = await response.json();

        if (data.success) {
          setReservation(data.data);
        } else {
          setError(data.error || "Rezervasyon bulunamadı");
        }
      } catch (err) {
        setError("Rezervasyon detayları yüklenirken hata oluştu");
        console.error("Error fetching reservation:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchReservationDetails();
    }
  }, [params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <FaCheckCircle className="text-green-500" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-500" />;
      case "completed":
        return <FaCalendarCheck className="text-blue-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "cancelled":
        return "İptal Edildi";
      case "completed":
        return "Tamamlandı";
      default:
        return "Bilinmiyor";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Rezervasyon detayları yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button
            onClick={() => router.back()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Rezervasyon bulunamadı</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Geri Dön
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Rezervasyon Detayları
          </h1>
          <p className="text-gray-600 mt-2">Rezervasyon ID: {reservation.id}</p>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              reservation.status
            )}`}
          >
            {getStatusIcon(reservation.status)}
            <span className="ml-2">{getStatusText(reservation.status)}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reservation Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaCalendarCheck className="mr-2 text-blue-500" />
              Rezervasyon Bilgileri
            </h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <FaClock className="text-gray-400 mr-3 w-5" />
                <div>
                  <p className="text-sm text-gray-500">Başlangıç Tarihi</p>
                  <p className="font-medium">
                    {formatDate(reservation.startDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <FaClock className="text-gray-400 mr-3 w-5" />
                <div>
                  <p className="text-sm text-gray-500">Bitiş Tarihi</p>
                  <p className="font-medium">
                    {formatDate(reservation.endDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <FaCalendarCheck className="text-gray-400 mr-3 w-5" />
                <div>
                  <p className="text-sm text-gray-500">Rezervasyon Tarihi</p>
                  <p className="font-medium">
                    {formatDate(reservation.createdAt)}
                  </p>
                </div>
              </div>

              {reservation.updatedAt && (
                <div className="flex items-center">
                  <FaClock className="text-gray-400 mr-3 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Son Güncelleme</p>
                    <p className="font-medium">
                      {formatDate(reservation.updatedAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-green-500" />
              Lokasyon Bilgileri
            </h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-400 mr-3 w-5" />
                <div>
                  <p className="text-sm text-gray-500">Teslim Alma Yeri</p>
                  <p className="font-medium">
                    {reservation.pickupLocation || "Belirtilmemiş"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-400 mr-3 w-5" />
                <div>
                  <p className="text-sm text-gray-500">Teslim Etme Yeri</p>
                  <p className="font-medium">
                    {reservation.giveupLocation || "Belirtilmemiş"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Car Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaCarSide className="mr-2 text-purple-500" />
              Araç Bilgileri
            </h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <FaCarSide className="text-gray-400 mr-3 w-5" />
                <div>
                  <p className="text-sm text-gray-500">Araç ID</p>
                  <p className="font-medium">{reservation.carId}</p>
                </div>
              </div>

              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">Araç detayları için</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Araç bilgilerini görüntüle
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              İşlemler
            </h2>

            <div className="space-y-3">
              {reservation.status === "active" && (
                <>
                  <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Rezervasyonu Güncelle
                  </button>
                  <button className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Rezervasyonu İptal Et
                  </button>
                </>
              )}

              <button className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                PDF Olarak İndir
              </button>

              <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Rezervasyonu Paylaş
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailsPage;
