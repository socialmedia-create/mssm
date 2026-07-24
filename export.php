<?php
// 🔐 Password protection using URL key
$exportPassword = "MySecurePassword123";
if (!isset($_GET['key']) || $_GET['key'] !== $exportPassword) {
    die("❌ Unauthorized access.");
}

// 🐞 Error reporting (optional for production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 🛠️ Connect to the database
$conn = new mysqli("localhost", "mssm", "mssm@202512345", "mssmdb", 3306);
if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

// 📋 Fetch user data with the auto timestamp
$query = "SELECT name, email, phone, experience, created_at FROM users";
$result = $conn->query($query);

if (!$result) {
    die("❌ Query failed: " . $conn->error);
}

// 📁 Set headers for CSV download
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="form_submissions.csv"');

// ✍️ Open stream
$output = fopen('php://output', 'w');

// 🧾 Add column headers
fputcsv($output, ['Name', 'Email', 'Phone', 'Experience', 'Created At']);

// 🔄 Output each row
while ($row = $result->fetch_assoc()) {
    fputcsv($output, $row);
}

// ✅ Done
fclose($output);
$conn->close();
exit;
?>
