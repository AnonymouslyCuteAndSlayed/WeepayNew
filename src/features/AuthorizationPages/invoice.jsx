import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // attaches autoTable to doc object

export default function InvoiceReport() {
  const handleDownload = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Invoice Report", 14, 22);

    // Customer details
    doc.setFontSize(12);
    doc.text("Customer: John Doe", 14, 32);
    doc.text("Email: john@example.com", 14, 40);
    doc.text("Date: 2025-09-10", 14, 48);

    // Table data
    doc.autoTable({
      startY: 60,
      head: [["Item", "Qty", "Price", "Total"]],
      body: [
        ["Laptop", "1", "₱1200", "₱1200"],
        ["Mouse", "2", "₱25", "₱50"],
      ],
    });

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for your business!", 14, doc.lastAutoTable.finalY + 10);

    // Save PDF
    doc.save("invoice.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Invoice Generator</h2>
      <button onClick={handleDownload}>Download Invoice PDF</button>
    </div>
  );
}
