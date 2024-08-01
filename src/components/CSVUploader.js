'use client';
import React, { useState } from 'react';

export default function CSVConverter() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const convertAndDownload = async (event) => {
        event.preventDefault();
        if (!file) {
            alert('Por favor, seleccione un archivo primero.');
            return;
        }

        try {
            // Leer el archivo
            const text = await file.text();

            // Reemplazar punto y coma por comas
            const convertedText = text.replace(/;/g, ',');

            // Crear un nuevo Blob con el contenido convertido
            const blob = new Blob([convertedText], { type: 'text/csv;charset=utf-8;' });

            // Crear un enlace de descarga
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `converted_${file.name}`);

            // Simular clic en el enlace para iniciar la descarga
            document.body.appendChild(link);
            link.click();

            // Limpiar
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al convertir el archivo:', error);
            alert('Hubo un error al convertir el archivo. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-xl">
                <h2 className="mb-4 text-2xl font-bold text-white">Convertir Archivo CSV</h2>
                <p className="mb-4 text-gray-300">Seleccione un archivo CSV para convertir.</p>
                <form onSubmit={convertAndDownload}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="csv-file">
                            Archivo CSV
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <p className="mb-2 text-sm text-gray-400">
                                        {file ? file.name : "No se ha seleccionado archivo"}
                                    </p>
                                </div>
                                <input
                                    id="csv-file"
                                    type="file"
                                    className="hidden"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Convertir Archivo
                    </button>
                </form>
            </div>
        </div>
    );
}
