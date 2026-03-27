<?php
// ============================================
// products.php - Fetch Products from DB
// AppleMall.lk - Phase 03
// ============================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

// Get filter parameters
$series = isset($_GET['series']) ? mysqli_real_escape_string($conn, $_GET['series']) : '';
$storage = isset($_GET['storage']) ? mysqli_real_escape_string($conn, $_GET['storage']) : '';
$price = isset($_GET['price']) ? floatval($_GET['price']) : 0;
$search = isset($_GET['search']) ? mysqli_real_escape_string($conn, $_GET['search']) : '';

// Build WHERE conditions
$conditions = [];

if (!empty($series)) {
    $conditions[] = "series = '$series'";
}

if (!empty($storage)) {
    $conditions[] = "storage = '$storage'";
}

if ($price > 0) {
    $conditions[] = "price <= $price";
}

if (!empty($search)) {
    $conditions[] = "(name LIKE '%$search%' OR description LIKE '%$search%')";
}

// Build SQL query
$where_sql = !empty($conditions) ? 'WHERE ' . implode(' AND ', $conditions) : '';
$sql = "SELECT * FROM products $where_sql ORDER BY 
        CASE WHEN series = '16' THEN 1
             WHEN series = '15' THEN 2
             WHEN series = '14' THEN 3
             WHEN series = '13' THEN 4
             ELSE 5 END, 
        price ASC";

// Execute query
$result = mysqli_query($conn, $sql);

// Check for query errors
if (!$result) {
    echo json_encode([
        'success' => false, 
        'message' => 'Database query failed: ' . mysqli_error($conn)
    ]);
    mysqli_close($conn);
    exit;
}

// Fetch products
$products = [];
while ($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}

// Return JSON response
echo json_encode(['success' => true, 'products' => $products]);

// Close connection
mysqli_close($conn);
?>