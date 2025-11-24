"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

const MOCK_ITEMS = [
  { id: "1", title: "Item 1", subtitle: "Detalle breve" },
  { id: "2", title: "Item 2", subtitle: "Detalle breve" },
  { id: "3", title: "Item 3", subtitle: "Detalle breve" },
];

export default function GestionPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión</h1>

      <div className="space-y-4">
        {MOCK_ITEMS.map((it) => (
          <Card key={it.id}>
            <CardHeader>
              <CardTitle>{it.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{it.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
'use client';

import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Modal, Input } from '@/components/ui';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useToggle } from '@/hooks';

interface AyniItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
}

const mockData: AyniItem[] = [
  {
    id: '1',
    name: 'Proyecto AYNI Alpha',
    description: 'Proyecto piloto de gestión comunitaria',
    status: 'active',
    createdAt: '2025-11-01',
  },
  {
    id: '2',
    name: 'Iniciativa Beta',
    description: 'Fase de prueba con usuarios',
    status: 'active',
    createdAt: '2025-11-10',
  },
  {
    id: '3',
    name: 'Investigación Gamma',
    description: 'Estudio de impacto social',
    status: 'inactive',
    createdAt: '2025-10-15',
  },
];

export default function GestionPage() {
  const [items, setItems] = useState<AyniItem[]>(mockData);
  const [selectedItem, setSelectedItem] = useState<AyniItem | null>(null);
  const createModal = useToggle(false);
  const editModal = useToggle(false);
  const detailModal = useToggle(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleCreateOpen = () => {
    setFormData({ name: '', description: '' });
    createModal.open();
  };

  const handleEditOpen = (item: AyniItem) => {
    setSelectedItem(item);
    setFormData({ name: item.name, description: item.description });
    editModal.open();
  };

  const handleDetailOpen = (item: AyniItem) => {
    setSelectedItem(item);
    detailModal.open();
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      archived: 'bg-red-100 text-red-800',
    };
    return styles[status as keyof typeof styles] || styles.active;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Gestión AYNI</h1>
          <p className="text-secondary-600">Administra los elementos del proyecto</p>
        </div>
        <Button onClick={handleCreateOpen} className="gap-2">
          <Plus size={20} />
          Nuevo Elemento
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200 bg-secondary-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Descripción</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                    <td className="px-6 py-4 text-sm text-secondary-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-secondary-600">{item.description}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleDetailOpen(item)}>
                          <Eye size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleEditOpen(item)}>
                          <Edit size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(item.id)}>
                          <Trash2 size={16} className="text-error" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create Modal */}
      <Modal isOpen={createModal.value} onClose={createModal.close} title="Crear Nuevo Elemento" size="md">
        <form className="space-y-4">
          <Input label="Nombre" placeholder="Nombre del elemento" />
          <Input label="Descripción" placeholder="Descripción detallada" />
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="secondary" fullWidth onClick={createModal.close}>
              Cancelar
            </Button>
            <Button type="submit" fullWidth>
              Crear
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModal.value} onClose={editModal.close} title="Editar Elemento" size="md">
        <form className="space-y-4">
          <Input label="Nombre" defaultValue={formData.name} placeholder="Nombre del elemento" />
          <Input label="Descripción" defaultValue={formData.description} placeholder="Descripción detallada" />
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="secondary" fullWidth onClick={editModal.close}>
              Cancelar
            </Button>
            <Button type="submit" fullWidth>
              Guardar
            </Button>
          </div>
        </form>
      </Modal>

      {/* Detail Modal */}
      <Modal isOpen={detailModal.value} onClose={detailModal.close} title="Detalles del Elemento" size="md">
        {selectedItem && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-secondary-700">Nombre</h3>
              <p className="mt-1 text-secondary-900">{selectedItem.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-secondary-700">Descripción</h3>
              <p className="mt-1 text-secondary-900">{selectedItem.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-secondary-700">Estado</h3>
              <p className="mt-1">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(selectedItem.status)}`}>
                  {selectedItem.status}
                </span>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-secondary-700">Fecha de Creación</h3>
              <p className="mt-1 text-secondary-900">{selectedItem.createdAt}</p>
            </div>
            <Button fullWidth variant="secondary" onClick={detailModal.close}>
              Cerrar
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
