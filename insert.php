<?php
file_put_contents("testlog.txt", "Form submitted!\n", FILE_APPEND);
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$conn = new mysqli("localhost", "mssm", "mssm@202512345", "mssmdb", 3306);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Sanitize inputs
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$phone = trim($_POST['phone']);
$experience = trim($_POST['experience']);
$country_code = trim($_POST['country_code']);
$full_phone = $country_code . $phone;

// Validate inputs
if (empty($name) || empty($email) || empty($phone) || empty($experience)) {
    die("All fields are required.");
}

if (!preg_match('/^\+?\d{10,15}$/', $full_phone)) {
    die("Invalid phone number format.");
}

// 🔍 Check if email already exists
$checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    // Email already exists
    echo "<script>
        alert('This email is already registered.');
        window.location.href = 'admission_2025.html';
    </script>";
    exit;
}
$checkStmt->close();

// ✅ Insert into database
$stmt = $conn->prepare("INSERT INTO users (name, email, phone, experience) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $full_phone, $experience);

if ($stmt->execute()) {
    // Redirect with success
    header("Location: admission_2025.html?success=1&download=1");
    exit;
} else {
    echo "Database error: " . $stmt->error;
}

$conn->close();
?>
