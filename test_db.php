<?php
echo "<h1>Simple Test</h1>";

// Test config file
echo "<h3>1. Testing config.php...</h3>";
require_once 'config.php';

if ($conn) {
    echo "<p style='color:green'>✅ config.php loaded successfully</p>";
} else {
    echo "<p style='color:red'>❌ config.php failed</p>";
}

// Test database query
echo "<h3>2. Testing database query...</h3>";
$result = mysqli_query($conn, "SELECT COUNT(*) as total FROM products");

if ($result) {
    $row = mysqli_fetch_assoc($result);
    echo "<p style='color:green'>✅ Query successful! Found " . $row['total'] . " products</p>";
    
    // Show first product
    $result2 = mysqli_query($conn, "SELECT name, price FROM products LIMIT 1");
    $product = mysqli_fetch_assoc($result2);
    echo "<p>Sample: " . $product['name'] . " - LKR " . number_format($product['price'], 0) . "</p>";
} else {
    echo "<p style='color:red'>❌ Query failed: " . mysqli_error($conn) . "</p>";
}

mysqli_close($conn);
?>