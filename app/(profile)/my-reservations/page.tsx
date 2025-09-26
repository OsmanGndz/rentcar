"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  FaCalendarCheck,
  FaCarSide,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
} from "react-icons/fa";
import api from "../../../lib/axios";

interface Reservation {
  resId: string;
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

const MyReservationsPage = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        // Get reservations for current user using userId parameter
        const response = await api.get(`/reservation?userId=${user?.uid}`);
        const data = response.data;

        if (data.success) {
          setReservations(data.reservations);
        } else {
          setError(data.error || "Rezervasyonlar yüklenemedi");
        }
      } catch (err) {
        setError("Rezervasyonlar yüklenirken hata oluştu");
        console.error("Error fetching reservations:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchReservations();
    } else {
      setLoading(false);
    }
  }, [user?.uid]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
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
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Rezervasyonlarım</h1>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Rezervasyonlar yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Rezervasyonlarım</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Rezervasyonlarım</h1>
        <div className="text-center py-8">
          <FaCalendarCheck className="mx-auto text-gray-400 text-6xl mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Henüz rezervasyonunuz yok
          </h3>
          <p className="text-gray-600 mb-4">
            İlk rezervasyonunuzu oluşturmak için araç seçin.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Araç Seç
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Rezervasyonlarım</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((reservation) => (
          <div
            key={reservation.resId}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            {/* Status Badge */}
            <div className="flex justify-between items-start mb-4">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  reservation.status
                )}`}
              >
                {getStatusIcon(reservation.status)}
                <span className="ml-1">
                  {getStatusText(reservation.status)}
                </span>
              </span>
              <span className="text-xs text-gray-500">
                #{reservation.resId.slice(-8)}
              </span>
            </div>

            {/* Dates */}
            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <FaClock className="mr-2" />
                <span>{formatDate(reservation.startDate)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaClock className="mr-2" />
                <span>{formatDate(reservation.endDate)}</span>
              </div>
            </div>

            {/* Locations */}
            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <FaMapMarkerAlt className="mr-2 text-green-500" />
                <span className="truncate">
                  {reservation.pickupLocation || "Belirtilmemiş"}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                <span className="truncate">
                  {reservation.giveupLocation || "Belirtilmemiş"}
                </span>
              </div>
            </div>

            {/* Car Info */}
            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <FaCarSide className="mr-2 text-purple-500" />
                <span>Araç ID: {reservation.carId}</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() =>
                router.push(`/my-reservations/${reservation.resId}`)
              }
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            >
              <FaEye className="mr-2" />
              Detayları Görüntüle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReservationsPage;
