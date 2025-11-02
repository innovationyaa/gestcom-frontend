import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Calendar,
  FileText,
  DollarSign,
  RefreshCw,
  User,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

const STATUS_CONFIG = {
  payee: {
    label: "Payée",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  en_attente: {
    label: "En attente",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  annulee: {
    label: "Annulée",
    color: "bg-red-100 text-red-800 border-red-200",
  },
};

const TYPE_CONFIG = {
  loyer: {
    label: "Loyer",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  electricite: {
    label: "Électricité",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  eau: { label: "Eau", color: "bg-blue-100 text-blue-800 border-blue-200" },
  internet: {
    label: "Internet",
    color: "bg-cyan-100 text-cyan-800 border-cyan-200",
  },
  telephone: {
    label: "Téléphone",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  assurance: {
    label: "Assurance",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  autre: { label: "Autre", color: "bg-gray-100 text-gray-800 border-gray-200" },
};

const RECURRENCE_LABELS = {
  mensuelle: "Mensuelle",
  trimestrielle: "Trimestrielle",
  semestrielle: "Semestrielle",
  annuelle: "Annuelle",
};

export default function ChargeFixeDetailModal({ charge, open, onClose }) {
  if (!charge) return null;

  const statusConfig = STATUS_CONFIG[charge.status] || STATUS_CONFIG.en_attente;
  const typeConfig = TYPE_CONFIG[charge.type] || TYPE_CONFIG.autre;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Détails de la Charge Fixe
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status & Type */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500 block mb-1">Type</span>
              <Badge className={typeConfig.color}>{typeConfig.label}</Badge>
            </div>
            <div>
              <span className="text-sm text-gray-500 block mb-1">Statut</span>
              <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
            </div>
          </div>

          {/* Main Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Date</span>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(charge.date)}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <RefreshCw className="h-4 w-4" />
                <span>Récurrence</span>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {RECURRENCE_LABELS[charge.recurrence] || charge.recurrence}
              </p>
            </div>

            <div className="space-y-1 col-span-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FileText className="h-4 w-4" />
                <span>Libellé</span>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {charge.libelle}
              </p>
            </div>

            {charge.beneficiaire && (
              <div className="space-y-1 col-span-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="h-4 w-4" />
                  <span>Bénéficiaire</span>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {charge.beneficiaire}
                </p>
              </div>
            )}
          </div>

          {/* Amount */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Montant
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Montant:</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {charge.montant.toLocaleString()} DH
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {charge.notes && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Notes
              </h3>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                {charge.notes}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
