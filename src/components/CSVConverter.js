'use client';
import React, { useState } from 'react';
import { convertCsv, validateCsvFile } from '@/lib/csv';

export default function CSVConverter() {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isConverting, setIsConverting] = useState(false);
    const [status, setStatus] = useState({ type: null, message: '' });

    const showError = (message) => setStatus({ type: 'error', message });
    const showSuccess = (message) => setStatus({ type: 'success', message });

    const handleFile = (selected) => {
        setStatus({ type: null, message: '' });
        if (!selected) return;

        const { valid, error } = validateCsvFile(selected);
        if (!valid) {
            setFile(null);
            showError(error);
            return;
        }
        setFile(selected);
    };

    const handleFileChange = (event) => {
        handleFile(event.target.files[0]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        handleFile(event.dataTransfer.files[0]);
    };

    const convertAndDownload = async (event) => {
        event.preventDefault();
        if (!file) {
            showError('Selecciona un archivo CSV primero.');
            return;
        }

        setIsConverting(true);
        setStatus({ type: null, message: '' });

        try {
            const text = await file.text();
            const convertedText = convertCsv(text);

            const blob = new Blob([convertedText], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `converted_${file.name}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            showSuccess(`Archivo convertido y descargado: converted_${file.name}`);
        } catch (error) {
            console.error('Error al convertir el archivo:', error);
            showError('Hubo un error al convertir el archivo. Inténtalo de nuevo.');
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-xl">
                <h1 className="mb-4 text-2xl font-bold text-white">Conversor CSV</h1>
                <p className="mb-4 text-gray-300">
                    Reemplaza los puntos y coma (;) por comas (,) en tu archivo CSV.
                </p>
                <form onSubmit={convertAndDownload} aria-busy={isConverting}>
                    <div className="mb-4">
                        <label
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-700 transition-colors hover:bg-gray-600 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-blue-900/40 ${
                                isDragging
                                    ? 'border-blue-400 bg-blue-900/40'
                                    : 'border-gray-600'
                            }`}
                        >
                            <span className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                                <span className="mb-2 block text-sm text-gray-300">
                                    {file
                                        ? file.name
                                        : 'Arrastra tu archivo CSV o haz clic para elegir'}
                                </span>
                            </span>
                            <input
                                id="csv-file"
                                type="file"
                                className="sr-only"
                                accept=".csv,text/csv"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    {status.type === 'error' && (
                        <p role="alert" className="mb-4 text-sm text-red-400">
                            {status.message}
                        </p>
                    )}
                    {status.type === 'success' && (
                        <p role="status" className="mb-4 text-sm text-green-400">
                            {status.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={!file || isConverting}
                        className={`w-full px-4 py-2 text-white rounded-lg transition-colors ${
                            !file || isConverting
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                        }`}
                    >
                        {isConverting ? 'Convirtiendo...' : 'Convertir y descargar'}
                    </button>
                </form>
            </div>
        </div>
    );
}
