<?php
// ============================================
// contact.php - Save Contact Messages to DB
// AppleMall.lk - Phase 03
// ============================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $full_name = trim(mysqli_real_escape_string($conn, $_POST['full_name'] ?? ''));
    $email     = trim(mysqli_real_escape_string($conn, $_POST['email'] ?? ''));
    $phone     = trim(mysqli_real_escape_string($conn, $_POST['phone'] ?? ''));
    $subject   = trim(mysqli_real_escape_string($conn, $_POST['subject'] ?? ''));
    $message   = trim(mysqli_real_escape_string($conn, $_POST['message'] ?? ''));

    // Validation
    if (empty($full_name) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'All required fields must be filled.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
        exit;
    }

    // Insert message
    $sql = "INSERT INTO contact_messages (full_name, email, phone, subject, message) 
            VALUES ('$full_name', '$email', '$phone', '$subject', '$message')";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(['success' => true, 'message' => 'Message sent successfully! We will respond within 24 hours.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again.']);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}

mysqli_close($conn);
?>
