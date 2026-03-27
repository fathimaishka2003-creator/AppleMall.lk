<?php
// ============================================
// order.php - Save Orders to DB
// AppleMall.lk - Phase 03
// ============================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $full_name      = trim(mysqli_real_escape_string($conn, $_POST['full_name'] ?? ''));
    $email          = trim(mysqli_real_escape_string($conn, $_POST['email'] ?? ''));
    $phone          = trim(mysqli_real_escape_string($conn, $_POST['phone'] ?? ''));
    $address        = trim(mysqli_real_escape_string($conn, $_POST['address'] ?? ''));
    $city           = trim(mysqli_real_escape_string($conn, $_POST['city'] ?? ''));
    $payment_method = trim(mysqli_real_escape_string($conn, $_POST['payment_method'] ?? 'cod'));
    $total_amount   = floatval($_POST['total_amount'] ?? 0);
    $cart_items     = $_POST['cart_items'] ?? '[]';

    // Validation
    if (empty($full_name) || empty($email) || empty($phone) || empty($address) || empty($city)) {
        echo json_encode(['success' => false, 'message' => 'All required fields must be filled.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
        exit;
    }

    // Generate order ID
    $order_id = 'AM-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -6));

    // Insert order
    $sql = "INSERT INTO orders (order_id, full_name, email, phone, address, city, payment_method, total_amount) 
            VALUES ('$order_id', '$full_name', '$email', '$phone', '$address', '$city', '$payment_method', $total_amount)";

    if (mysqli_query($conn, $sql)) {
        // Insert order items
        $items = json_decode($cart_items, true);
        if (is_array($items)) {
            foreach ($items as $item) {
                $product_id   = intval($item['id'] ?? 0);
                $product_name = mysqli_real_escape_string($conn, $item['name'] ?? '');
                $quantity     = intval($item['qty'] ?? 1);
                $price        = floatval($item['price'] ?? 0);

                $item_sql = "INSERT INTO order_items (order_id, product_id, product_name, quantity, price) 
                             VALUES ('$order_id', $product_id, '$product_name', $quantity, $price)";
                mysqli_query($conn, $item_sql);
            }
        }

        echo json_encode([
            'success'  => true,
            'message'  => 'Order placed successfully!',
            'order_id' => $order_id
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to place order. Please try again.']);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}

mysqli_close($conn);
?>
