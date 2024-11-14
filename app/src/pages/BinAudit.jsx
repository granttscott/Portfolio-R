import React from 'react';
import * as XLSX from 'xlsx';
import { Link, useNavigate } from 'react-router-dom';
import styles from './BinAudit.module.css';  // Import as styles

const BinAudit = () => {
    const navigate = useNavigate();
    const processData = () => {
        const fileInput = document.getElementById('excelFileInput');
        const file = fileInput.files[0];
        
        if (!file) {
            alert('Please select an Excel file first.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const emailLocationsMap = new Map();

            // Skip header row
            jsonData.slice(1).forEach(row => {
                if (row.length >= 2) {
                    const location = row[0].trim();
                    const email = row[1].trim();
                    if (!emailLocationsMap.has(email)) {
                        emailLocationsMap.set(email, []);
                    }
                    emailLocationsMap.get(email).push(location);
                }
            });

            // Sample 10% of locations for each email
            const sampledData = new Map();
            emailLocationsMap.forEach((locations, email) => {
                const sampleSize = Math.ceil(locations.length * 0.1);
                const sampledLocations = locations
                    .sort(() => 0.5 - Math.random())
                    .slice(0, sampleSize);
                sampledData.set(email, sampledLocations);
            });

            // Remove server communication and directly create Excel file
            createAndDownloadExcel(sampledData);
        };
        reader.readAsArrayBuffer(file);
    };

    const createAndDownloadExcel = (sampledData) => {
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        
        // Convert the sampledData to an array of arrays
        const data = [['Location', 'Created By']];
        sampledData.forEach((locations, email) => {
            locations.forEach(location => {
                data.push([location, email]);
            });
        });
    
        // Create a worksheet
        const ws = XLSX.utils.aoa_to_sheet(data);
    
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "Sampled Locations");
    
        // Generate XLSX file and create a download link
        XLSX.writeFile(wb, 'PROCESS-AUDIT-OUTPUT.xlsx');
    };

    return (
        <div className={styles.container}>
      <button className="back" onClick={() => navigate(-1)}>Back</button>
        <Link to="/">
          <button className="home">Home</button>
        </Link>
            <header>
                <h1 className="header">Location Picker</h1>
            </header>
            <input type="file" id="excelFileInput" accept=".xlsx" />
            <button onClick={processData} className={styles.btnPrimary}>
                Process
            </button>
            <a id="downloadLink" style={{ display: 'none' }}>
                Download Processed CSV
            </a>
        </div>
    );
};

export default BinAudit;