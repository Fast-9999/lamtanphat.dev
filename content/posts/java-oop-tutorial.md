---
title: "Java OOP Tutorial 2025: Modern Patterns & Spring Boot 3.x"
description: "Hướng dẫn chi tiết về Object-Oriented Programming trong Java với Modern Features, Design Patterns, Spring Boot 3.x và Cloud-Native Development"
date: 2025-02-15
categories: ["java-mastery-2025"]
tags: ["java", "oop", "design-patterns", "advanced", "java17", "java21", "spring-boot-3", "modern-java", "cloud-native", "2025"]
featured: true
image: "https://codingweek.org/wp-content/uploads/2019/08/christopher-robin-ebbinghaus-pgSkeh0yl8o-unsplash.jpg"
draft: false
---

# Java OOP Tutorial 2025: Modern Patterns & Spring Boot 3.x

Object-Oriented Programming (OOP) là nền tảng của Java. Trong bài viết này, chúng ta sẽ đi sâu vào các khái niệm OOP nâng cao, design patterns và best practices trong Java, với focus vào **Modern Java Features**, **Spring Boot 3.x**, và **Cloud-Native Development** cho năm 2025.

## 🎯 Mục tiêu bài viết

Sau khi đọc xong bài viết này, bạn sẽ hiểu:
- Các khái niệm OOP nâng cao trong Java 17/21
- Modern Java Features: Records, Pattern Matching, Sealed Classes
- Design Patterns với Spring Boot 3.x
- SOLID Principles trong Cloud-Native Development
- Generic Programming và Type Safety
- Exception Handling với Modern Java
- Reflection, Annotations và Spring Boot Integration
- Performance Optimization cho Production

## 🏗️ Advanced OOP Concepts

### 1. Static vs Instance Members

```java
public class Counter {
    // Static variable - shared among all instances
    private static int totalCount = 0;
    
    // Instance variable - unique to each instance
    private int instanceCount = 0;
    
    public Counter() {
        totalCount++;
        instanceCount++;
    }
    
    // Static method - can be called without creating instance
    public static int getTotalCount() {
        return totalCount;
    }
    
    // Instance method - requires instance
    public int getInstanceCount() {
        return instanceCount;
    }
    
    // Static block - executed when class is loaded
    static {
        System.out.println("Counter class loaded");
    }
}

// Usage
public class CounterDemo {
    public static void main(String[] args) {
        System.out.println("Total count: " + Counter.getTotalCount()); // 0
        
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        
        System.out.println("Total count: " + Counter.getTotalCount()); // 2
        System.out.println("C1 instance count: " + c1.getInstanceCount()); // 1
        System.out.println("C2 instance count: " + c2.getInstanceCount()); // 1
    }
}
```

### 2. Method Overloading vs Overriding

```java
public class Calculator {
    // Method Overloading - same method name, different parameters
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public String add(String a, String b) {
        return a + b;
    }
}

public class AdvancedCalculator extends Calculator {
    // Method Overriding - same method signature, different implementation
    @Override
    public int add(int a, int b) {
        System.out.println("Advanced addition");
        return super.add(a, b); // Call parent method
    }
    
    // New method specific to AdvancedCalculator
    public int multiply(int a, int b) {
        return a * b;
    }
}
```

### 3. Abstract Classes và Interfaces

```java
// Abstract class - can have both abstract and concrete methods
public abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    // Abstract method - must be implemented by subclasses
    public abstract double getArea();
    public abstract double getPerimeter();
    
    // Concrete method - can be used by subclasses
    public void setColor(String color) {
        this.color = color;
    }
    
    public String getColor() {
        return color;
    }
}

// Interface - only abstract methods (before Java 8)
public interface Drawable {
    void draw();
    void erase();
    
    // Default method (Java 8+)
    default void display() {
        System.out.println("Displaying drawable object");
    }
    
    // Static method (Java 8+)
    static void showInfo() {
        System.out.println("This is a drawable interface");
    }
}

// Concrete class implementing both abstract class and interface
public class Circle extends Shape implements Drawable {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public double getPerimeter() {
        return 2 * Math.PI * radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing " + color + " circle with radius " + radius);
    }
    
    @Override
    public void erase() {
        System.out.println("Erasing circle");
    }
}
```

## 🆕 Modern Java Features (2025)

### 1. Records - Modern Data Classes

**Records** (Java 14+) thay thế traditional classes cho data transfer:

```java
// ✅ Modern way với Records
public record User(Long id, String name, String email, int age) {
    // Compact constructor với validation
    public User {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
    }
    
    // Custom methods
    public boolean isAdult() {
        return age >= 18;
    }
    
    public String getDisplayName() {
        return name + " (" + email + ")";
    }
}

// ❌ Old way với traditional class
public class User {
    private final Long id;
    private final String name;
    private final String email;
    private final int age;
    
    // Constructor, getters, equals, hashCode, toString...
    // Rất nhiều boilerplate code
}

// Usage với Pattern Matching
public class UserService {
    public String processUser(Object user) {
        return switch (user) {
            case User u when u.isAdult() -> "Adult user: " + u.getDisplayName();
            case User u -> "Minor user: " + u.name();
            case String s -> "String input: " + s;
            case null -> "Null user";
            default -> "Unknown type";
        };
    }
}
```

### 2. Sealed Classes - Controlled Inheritance

**Sealed Classes** (Java 17+) kiểm soát inheritance hierarchy:

```java
// Sealed class - chỉ cho phép một số class kế thừa
public sealed class PaymentMethod 
    permits CreditCard, PayPal, BankTransfer {
    
    protected final String id;
    protected final double amount;
    
    public PaymentMethod(String id, double amount) {
        this.id = id;
        this.amount = amount;
    }
    
    public abstract void process();
    public abstract String getProvider();
}

// Các class được phép kế thừa
public final class CreditCard extends PaymentMethod {
    private final String cardNumber;
    private final String expiryDate;
    
    public CreditCard(String id, double amount, String cardNumber, String expiryDate) {
        super(id, amount);
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
    }
    
    @Override
    public void process() {
        System.out.println("Processing credit card payment: " + cardNumber);
    }
    
    @Override
    public String getProvider() {
        return "Credit Card Provider";
    }
}

public final class PayPal extends PaymentMethod {
    private final String email;
    
    public PayPal(String id, double amount, String email) {
        super(id, amount);
        this.email = email;
    }
    
    @Override
    public void process() {
        System.out.println("Processing PayPal payment: " + email);
    }
    
    @Override
    public String getProvider() {
        return "PayPal";
    }
}

// Pattern Matching với Sealed Classes
public class PaymentProcessor {
    public String processPayment(PaymentMethod payment) {
        return switch (payment) {
            case CreditCard cc -> "Credit card payment processed: " + cc.getProvider();
            case PayPal pp -> "PayPal payment processed: " + pp.getProvider();
            case BankTransfer bt -> "Bank transfer processed: " + bt.getProvider();
        };
    }
}
```

### 3. Virtual Threads - Modern Concurrency

**Virtual Threads** (Java 21) cho high-performance concurrent applications:

```java
// Modern concurrent service với Virtual Threads
@Service
public class OrderProcessingService {
    
    private final OrderRepository orderRepository;
    private final PaymentService paymentService;
    private final InventoryService inventoryService;
    private final NotificationService notificationService;
    
    public OrderProcessingService(OrderRepository orderRepository,
                                 PaymentService paymentService,
                                 InventoryService inventoryService,
                                 NotificationService notificationService) {
        this.orderRepository = orderRepository;
        this.paymentService = paymentService;
        this.inventoryService = inventoryService;
        this.notificationService = notificationService;
    }
    
    @Async("virtualThreadExecutor")
    public CompletableFuture<OrderResult> processOrder(OrderRequest request) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                // Validate order
                validateOrder(request);
                
                // Process payment
                PaymentResult payment = paymentService.processPayment(request.payment());
                
                // Update inventory
                inventoryService.reserveItems(request.items());
                
                // Create order
                Order order = orderRepository.save(createOrder(request, payment));
                
                // Send notification
                notificationService.sendOrderConfirmation(order);
                
                return new OrderResult(order.id(), "SUCCESS", "Order processed successfully");
                
            } catch (Exception e) {
                return new OrderResult(null, "FAILED", e.getMessage());
            }
        });
    }
    
    @Bean
    public Executor virtualThreadExecutor() {
        return Executors.newVirtualThreadPerTaskExecutor();
    }
    
    private void validateOrder(OrderRequest request) {
        if (request.items().isEmpty()) {
            throw new IllegalArgumentException("Order must contain items");
        }
    }
    
    private Order createOrder(OrderRequest request, PaymentResult payment) {
        return new Order(
            UUID.randomUUID(),
            request.customerId(),
            request.items(),
            payment.transactionId(),
            OrderStatus.CONFIRMED,
            LocalDateTime.now()
        );
    }
}

// Records cho DTOs
public record OrderRequest(
    Long customerId,
    List<OrderItem> items,
    PaymentMethod payment
) {}

public record OrderResult(
    UUID orderId,
    String status,
    String message
) {}
```

## 🎨 Design Patterns

### 1. Singleton Pattern

```java
public class DatabaseConnection {
    private static DatabaseConnection instance;
    private String connectionString;
    
    // Private constructor to prevent instantiation
    private DatabaseConnection() {
        this.connectionString = "jdbc:mysql://localhost:3306/mydb";
    }
    
    // Thread-safe singleton
    public static synchronized DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
    
    // Alternative: Double-checked locking
    public static DatabaseConnection getInstanceDoubleChecked() {
        if (instance == null) {
            synchronized (DatabaseConnection.class) {
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
    
    public String getConnectionString() {
        return connectionString;
    }
}
```

### 2. Factory Pattern

```java
// Product interface
public interface Vehicle {
    void start();
    void stop();
    void getInfo();
}

// Concrete products
public class Car implements Vehicle {
    @Override
    public void start() {
        System.out.println("Car engine started");
    }
    
    @Override
    public void stop() {
        System.out.println("Car engine stopped");
    }
    
    @Override
    public void getInfo() {
        System.out.println("This is a Car");
    }
}

public class Motorcycle implements Vehicle {
    @Override
    public void start() {
        System.out.println("Motorcycle engine started");
    }
    
    @Override
    public void stop() {
        System.out.println("Motorcycle engine stopped");
    }
    
    @Override
    public void getInfo() {
        System.out.println("This is a Motorcycle");
    }
}

// Factory class
public class VehicleFactory {
    public static Vehicle createVehicle(String type) {
        switch (type.toLowerCase()) {
            case "car":
                return new Car();
            case "motorcycle":
                return new Motorcycle();
            default:
                throw new IllegalArgumentException("Unknown vehicle type: " + type);
        }
    }
}

// Usage
public class FactoryDemo {
    public static void main(String[] args) {
        Vehicle car = VehicleFactory.createVehicle("car");
        Vehicle motorcycle = VehicleFactory.createVehicle("motorcycle");
        
        car.start();
        motorcycle.start();
    }
}
```

### 3. Observer Pattern

```java
import java.util.ArrayList;
import java.util.List;

// Subject interface
public interface Subject {
    void registerObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
}

// Observer interface
public interface Observer {
    void update(String message);
}

// Concrete subject
public class NewsAgency implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private String news;
    
    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }
    
    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }
    
    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(news);
        }
    }
    
    public void setNews(String news) {
        this.news = news;
        notifyObservers();
    }
}

// Concrete observer
public class NewsChannel implements Observer {
    private String channelName;
    
    public NewsChannel(String channelName) {
        this.channelName = channelName;
    }
    
    @Override
    public void update(String message) {
        System.out.println(channelName + " received news: " + message);
    }
}

// Usage
public class ObserverDemo {
    public static void main(String[] args) {
        NewsAgency agency = new NewsAgency();
        
        NewsChannel channel1 = new NewsChannel("CNN");
        NewsChannel channel2 = new NewsChannel("BBC");
        
        agency.registerObserver(channel1);
        agency.registerObserver(channel2);
        
        agency.setNews("Breaking: Java 17 released!");
    }
}
```

## 🚀 Spring Boot 3.x Integration với OOP Patterns

### 1. Repository Pattern với Spring Data JPA

```java
// Entity với JPA annotations
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    private int age;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    // Constructors, getters, setters
    public User() {}
    
    public User(String name, String email, int age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }
    
    // Getters and setters...
}

// Repository interface với Spring Data JPA
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Query methods
    List<User> findByAgeGreaterThan(int age);
    
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.name LIKE %:name%")
    List<User> findByNameContaining(@Param("name") String name);
    
    @Modifying
    @Query("UPDATE User u SET u.age = :age WHERE u.id = :id")
    int updateAge(@Param("id") Long id, @Param("age") int age);
}

// Service layer với dependency injection
@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final UserValidator userValidator;
    
    public UserService(UserRepository userRepository,
                      EmailService emailService,
                      UserValidator userValidator) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.userValidator = userValidator;
    }
    
    public User createUser(CreateUserRequest request) {
        // Validation
        userValidator.validate(request);
        
        // Create user
        User user = new User(request.name(), request.email(), request.age());
        User savedUser = userRepository.save(user);
        
        // Send welcome email
        emailService.sendWelcomeEmail(savedUser.getEmail());
        
        return savedUser;
    }
    
    public List<User> getAdultUsers() {
        return userRepository.findByAgeGreaterThan(17);
    }
    
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
```

### 2. Controller Pattern với Spring Boot 3.x

```java
// REST Controller với modern annotations
@RestController
@RequestMapping("/api/v1/users")
@Validated
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        List<User> users = userService.getAllUsers(page, size);
        List<UserResponse> responses = users.stream()
            .map(this::mapToResponse)
            .toList();
            
        return ResponseEntity.ok(responses);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
            .map(this::mapToResponse)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<UserResponse> createUser(
            @RequestBody @Valid CreateUserRequest request) {
        
        User user = userService.createUser(request);
        UserResponse response = mapToResponse(user);
        
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(response);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody @Valid UpdateUserRequest request) {
        
        return userService.updateUser(id, request)
            .map(this::mapToResponse)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.deleteUser(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    private UserResponse mapToResponse(User user) {
        return new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getAge(),
            user.getCreatedAt()
        );
    }
}

// DTOs với Records
public record CreateUserRequest(
    @NotBlank String name,
    @Email String email,
    @Min(0) int age
) {}

public record UpdateUserRequest(
    @NotBlank String name,
    @Min(0) int age
) {}

public record UserResponse(
    Long id,
    String name,
    String email,
    int age,
    LocalDateTime createdAt
) {}
```

### 3. Configuration Pattern với Spring Boot 3.x

```java
// Configuration class với modern Spring Boot 3.x
@Configuration
@EnableAsync
@EnableScheduling
public class AppConfig {
    
    @Bean
    public Executor virtualThreadExecutor() {
        return Executors.newVirtualThreadPerTaskExecutor();
    }
    
    @Bean
    public ObjectMapper objectMapper() {
        return JsonMapper.builder()
            .addModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .build();
    }
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplateBuilder()
            .setConnectTimeout(Duration.ofSeconds(5))
            .setReadTimeout(Duration.ofSeconds(10))
            .build();
    }
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*");
            }
        };
    }
}

// Application properties với modern Spring Boot 3.x
@ConfigurationProperties(prefix = "app")
@Validated
public class AppProperties {
    
    @NotBlank
    private String name;
    
    @Email
    private String adminEmail;
    
    @Min(1)
    @Max(100)
    private int maxUsers;
    
    private Database database = new Database();
    
    // Getters and setters...
    
    public static class Database {
        private String url;
        private String username;
        private String password;
        private int poolSize = 10;
        
        // Getters and setters...
    }
}
```

## 🔧 SOLID Principles

### 1. Single Responsibility Principle (SRP)

```java
// ❌ Bad - multiple responsibilities
public class User {
    private String name;
    private String email;
    
    public void saveToDatabase() { /* ... */ }
    public void sendEmail() { /* ... */ }
    public void validateEmail() { /* ... */ }
}

// ✅ Good - single responsibility
public class User {
    private String name;
    private String email;
    
    // Getters and setters only
}

public class UserRepository {
    public void save(User user) { /* ... */ }
    public User findById(String id) { /* ... */ }
}

public class EmailService {
    public void sendEmail(String email, String message) { /* ... */ }
}

public class EmailValidator {
    public boolean isValid(String email) { /* ... */ }
}
```

### 2. Open/Closed Principle (OCP)

```java
// ✅ Good - open for extension, closed for modification
public abstract class PaymentProcessor {
    public abstract void processPayment(double amount);
}

public class CreditCardProcessor extends PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing credit card payment: $" + amount);
    }
}

public class PayPalProcessor extends PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing PayPal payment: $" + amount);
    }
}

public class PaymentService {
    private PaymentProcessor processor;
    
    public PaymentService(PaymentProcessor processor) {
        this.processor = processor;
    }
    
    public void makePayment(double amount) {
        processor.processPayment(amount);
    }
}
```

### 3. Liskov Substitution Principle (LSP)

```java
// ✅ Good - subclasses can replace parent class
public class Rectangle {
    protected int width;
    protected int height;
    
    public void setWidth(int width) {
        this.width = width;
    }
    
    public void setHeight(int height) {
        this.height = height;
    }
    
    public int getArea() {
        return width * height;
    }
}

public class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        this.width = width;
        this.height = width;
    }
    
    @Override
    public void setHeight(int height) {
        this.width = height;
        this.height = height;
    }
}

// Usage - both can be used interchangeably
public void calculateArea(Rectangle rectangle) {
    rectangle.setWidth(5);
    rectangle.setHeight(4);
    System.out.println("Area: " + rectangle.getArea());
}
```

## 🎯 Generic Programming

```java
// Generic class
public class Box<T> {
    private T content;
    
    public void setContent(T content) {
        this.content = content;
    }
    
    public T getContent() {
        return content;
    }
}

// Generic method
public class GenericUtils {
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.print(element + " ");
        }
        System.out.println();
    }
    
    public static <T extends Comparable<T>> T findMax(T[] array) {
        if (array.length == 0) return null;
        
        T max = array[0];
        for (T element : array) {
            if (element.compareTo(max) > 0) {
                max = element;
            }
        }
        return max;
    }
}

// Usage
public class GenericDemo {
    public static void main(String[] args) {
        // Generic class
        Box<String> stringBox = new Box<>();
        stringBox.setContent("Hello");
        
        Box<Integer> intBox = new Box<>();
        intBox.setContent(42);
        
        // Generic method
        String[] strings = {"Hello", "World", "Java"};
        Integer[] numbers = {1, 5, 3, 9, 2};
        
        GenericUtils.printArray(strings);
        GenericUtils.printArray(numbers);
        
        System.out.println("Max string: " + GenericUtils.findMax(strings));
        System.out.println("Max number: " + GenericUtils.findMax(numbers));
    }
}
```

## 🚨 Exception Handling với OOP

```java
// Custom exception
public class InsufficientFundsException extends Exception {
    private double amount;
    private double balance;
    
    public InsufficientFundsException(double amount, double balance) {
        super("Insufficient funds. Required: " + amount + ", Available: " + balance);
        this.amount = amount;
        this.balance = balance;
    }
    
    public double getAmount() {
        return amount;
    }
    
    public double getBalance() {
        return balance;
    }
}

// Bank account with exception handling
public class BankAccount {
    private double balance;
    private String accountNumber;
    
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(amount, balance);
        }
        balance -= amount;
        System.out.println("Withdrawn: $" + amount + ", New balance: $" + balance);
    }
    
    public void deposit(double amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("Deposit amount cannot be negative");
        }
        balance += amount;
        System.out.println("Deposited: $" + amount + ", New balance: $" + balance);
    }
    
    public double getBalance() {
        return balance;
    }
}

// Usage with exception handling
public class BankDemo {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("12345", 1000.0);
        
        try {
            account.deposit(500.0);
            account.withdraw(200.0);
            account.withdraw(2000.0); // This will throw exception
        } catch (InsufficientFundsException e) {
            System.err.println("Error: " + e.getMessage());
            System.err.println("Required: $" + e.getAmount());
            System.err.println("Available: $" + e.getBalance());
        } catch (IllegalArgumentException e) {
            System.err.println("Error: " + e.getMessage());
        } finally {
            System.out.println("Final balance: $" + account.getBalance());
        }
    }
}
```

## 🔍 Reflection và Annotations

```java
import java.lang.reflect.Field;
import java.lang.reflect.Method;

// Custom annotation
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface TestMethod {
    String description() default "";
    int priority() default 0;
}

// Class with annotations
public class TestClass {
    @TestMethod(description = "Test addition", priority = 1)
    public void testAddition() {
        System.out.println("Testing addition");
    }
    
    @TestMethod(description = "Test subtraction", priority = 2)
    public void testSubtraction() {
        System.out.println("Testing subtraction");
    }
    
    public void regularMethod() {
        System.out.println("Regular method");
    }
}

// Reflection demo
public class ReflectionDemo {
    public static void main(String[] args) {
        Class<?> clazz = TestClass.class;
        
        // Get all methods
        Method[] methods = clazz.getDeclaredMethods();
        
        for (Method method : methods) {
            if (method.isAnnotationPresent(TestMethod.class)) {
                TestMethod annotation = method.getAnnotation(TestMethod.class);
                System.out.println("Method: " + method.getName());
                System.out.println("Description: " + annotation.description());
                System.out.println("Priority: " + annotation.priority());
                System.out.println("---");
            }
        }
    }
}
```

## ☁️ Cloud-Native Development với OOP Patterns

### 1. Microservices Architecture với Spring Boot 3.x

```java
// Service Discovery với Spring Cloud
@SpringBootApplication
@EnableDiscoveryClient
@EnableCircuitBreaker
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}

// Feign Client cho service communication
@FeignClient(name = "notification-service", fallback = NotificationServiceFallback.class)
public interface NotificationServiceClient {
    
    @PostMapping("/api/notifications")
    ResponseEntity<Void> sendNotification(@RequestBody NotificationRequest request);
    
    @GetMapping("/api/notifications/{userId}")
    ResponseEntity<List<Notification>> getUserNotifications(@PathVariable Long userId);
}

// Circuit Breaker pattern
@Component
public class NotificationServiceFallback implements NotificationServiceClient {
    
    private static final Logger logger = LoggerFactory.getLogger(NotificationServiceFallback.class);
    
    @Override
    public ResponseEntity<Void> sendNotification(NotificationRequest request) {
        logger.warn("Notification service is down, using fallback");
        // Store in queue for later processing
        return ResponseEntity.accepted().build();
    }
    
    @Override
    public ResponseEntity<List<Notification>> getUserNotifications(Long userId) {
        logger.warn("Notification service is down, returning empty list");
        return ResponseEntity.ok(List.of());
    }
}

// Event-driven architecture với Spring Cloud Stream
@EnableBinding(Source.class)
@Service
public class UserEventService {
    
    private final Source source;
    
    public UserEventService(Source source) {
        this.source = source;
    }
    
    public void publishUserCreatedEvent(User user) {
        UserCreatedEvent event = new UserCreatedEvent(
            user.getId(),
            user.getName(),
            user.getEmail(),
            LocalDateTime.now()
        );
        
        source.output().send(MessageBuilder
            .withPayload(event)
            .setHeader("eventType", "USER_CREATED")
            .build());
    }
    
    public void publishUserUpdatedEvent(User user) {
        UserUpdatedEvent event = new UserUpdatedEvent(
            user.getId(),
            user.getName(),
            user.getEmail(),
            LocalDateTime.now()
        );
        
        source.output().send(MessageBuilder
            .withPayload(event)
            .setHeader("eventType", "USER_UPDATED")
            .build());
    }
}

// Event records
public record UserCreatedEvent(
    Long userId,
    String name,
    String email,
    LocalDateTime timestamp
) {}

public record UserUpdatedEvent(
    Long userId,
    String name,
    String email,
    LocalDateTime timestamp
) {}
```

### 2. Containerization với Docker và Kubernetes

```dockerfile
# Dockerfile cho Spring Boot 3.x application
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy application
COPY target/user-service.jar app.jar

# JVM tuning cho containers
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:+UseStringDeduplication"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
```

```yaml
# Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "kubernetes"
        - name: JAVA_OPTS
          value: "-Xmx512m -Xms256m -XX:+UseG1GC"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
```

### 3. Observability và Monitoring

```java
// Custom metrics với Micrometer
@Component
public class UserMetrics {
    
    private final Counter userCreatedCounter;
    private final Timer userProcessingTimer;
    private final Gauge activeUsersGauge;
    
    public UserMetrics(MeterRegistry meterRegistry) {
        this.userCreatedCounter = Counter.builder("users.created")
            .description("Number of users created")
            .register(meterRegistry);
            
        this.userProcessingTimer = Timer.builder("users.processing.time")
            .description("Time taken to process user operations")
            .register(meterRegistry);
            
        this.activeUsersGauge = Gauge.builder("users.active")
            .description("Number of active users")
            .register(meterRegistry, this, UserMetrics::getActiveUsersCount);
    }
    
    public void incrementUserCreated() {
        userCreatedCounter.increment();
    }
    
    public Timer.Sample startProcessingTimer() {
        return Timer.start();
    }
    
    public void recordProcessingTime(Timer.Sample sample) {
        sample.stop(userProcessingTimer);
    }
    
    private double getActiveUsersCount() {
        // Return actual active users count
        return 100.0; // Example
    }
}

// Distributed tracing với Spring Cloud Sleuth
@Service
public class UserService {
    
    private final Tracer tracer;
    private final UserRepository userRepository;
    private final UserMetrics userMetrics;
    
    public UserService(Tracer tracer, UserRepository userRepository, UserMetrics userMetrics) {
        this.tracer = tracer;
        this.userRepository = userRepository;
        this.userMetrics = userMetrics;
    }
    
    @Transactional
    public User createUser(CreateUserRequest request) {
        Span span = tracer.nextSpan()
            .name("create-user")
            .tag("user.email", request.email())
            .start();
            
        try (Tracer.SpanInScope ws = tracer.withSpanInScope(span)) {
            userMetrics.incrementUserCreated();
            
            Timer.Sample sample = userMetrics.startProcessingTimer();
            
            // Validate user
            validateUser(request);
            
            // Create user
            User user = new User(request.name(), request.email(), request.age());
            User savedUser = userRepository.save(user);
            
            userMetrics.recordProcessingTime(sample);
            
            return savedUser;
        } finally {
            span.end();
        }
    }
    
    private void validateUser(CreateUserRequest request) {
        // Validation logic
    }
}
```

## ⚡ Performance Optimization cho Production

### 1. JVM Tuning cho Spring Boot 3.x

```bash
# JVM options cho production với Java 21
java -jar user-service.jar \
  -Xmx2g -Xms2g \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UseStringDeduplication \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+UseZGC \
  -XX:+UseTransparentHugePages \
  -Djava.security.egd=file:/dev/./urandom \
  -Dspring.profiles.active=production
```

### 2. Database Optimization với JPA

```java
// Entity với optimization annotations
@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_user_email", columnList = "email"),
    @Index(name = "idx_user_age", columnList = "age")
})
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(unique = true, nullable = false, length = 255)
    private String email;
    
    @Column(nullable = false)
    private int age;
    
    // Lazy loading for relationships
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();
    
    // Getters and setters...
}

// Repository với query optimization
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Use projections for better performance
    @Query("SELECT new com.example.dto.UserSummary(u.id, u.name, u.email) FROM User u WHERE u.age > :age")
    List<UserSummary> findUserSummariesByAgeGreaterThan(@Param("age") int age);
    
    // Batch operations
    @Modifying
    @Query("UPDATE User u SET u.age = u.age + 1 WHERE u.id IN :ids")
    int incrementAgeByIds(@Param("ids") List<Long> ids);
    
    // Native query for complex operations
    @Query(value = "SELECT * FROM users WHERE age BETWEEN :minAge AND :maxAge ORDER BY created_at DESC LIMIT :limit", 
           nativeQuery = true)
    List<User> findUsersByAgeRange(@Param("minAge") int minAge, 
                                  @Param("maxAge") int maxAge, 
                                  @Param("limit") int limit);
}

// Service với caching
@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Cacheable(value = "users", key = "#id")
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    @CacheEvict(value = "users", key = "#user.id")
    public User updateUser(User user) {
        return userRepository.save(user);
    }
    
    @CacheEvict(value = "users", allEntries = true)
    public void clearUserCache() {
        // Cache will be cleared
    }
}
```

## 🧪 Unit Testing với OOP

```java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;

public class BankAccountTest {
    private BankAccount account;
    
    @BeforeEach
    public void setUp() {
        account = new BankAccount("12345", 1000.0);
    }
    
    @Test
    public void testDeposit() {
        account.deposit(500.0);
        assertEquals(1500.0, account.getBalance());
    }
    
    @Test
    public void testWithdraw() throws InsufficientFundsException {
        account.withdraw(300.0);
        assertEquals(700.0, account.getBalance());
    }
    
    @Test
    public void testInsufficientFunds() {
        assertThrows(InsufficientFundsException.class, () -> {
            account.withdraw(2000.0);
        });
    }
    
    @Test
    public void testNegativeDeposit() {
        assertThrows(IllegalArgumentException.class, () -> {
            account.deposit(-100.0);
        });
    }
}
```

## 🛠️ Bài tập thực hành

### Exercise 1: Modern Java Features với Spring Boot 3.x
Xây dựng REST API quản lý sản phẩm sử dụng Records, Sealed Classes và Virtual Threads:

```java
// 1. Tạo Product record với validation
public record Product(Long id, String name, BigDecimal price, String category) {
    public Product {
        if (price.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Price cannot be negative");
        }
    }
}

// 2. Tạo Sealed PaymentMethod
public sealed class PaymentMethod permits CreditCard, PayPal, BankTransfer {
    // Implementation
}

// 3. Tạo ProductService với Virtual Threads
@Service
public class ProductService {
    @Async("virtualThreadExecutor")
    public CompletableFuture<Product> createProduct(CreateProductRequest request) {
        // Implementation
    }
}
```

### Exercise 2: Cloud-Native Microservices
Xây dựng microservices architecture với Spring Cloud:

```java
// 1. Tạo Order Service
@SpringBootApplication
@EnableDiscoveryClient
public class OrderServiceApplication {
    // Implementation
}

// 2. Tạo Inventory Service
@SpringBootApplication
@EnableDiscoveryClient
public class InventoryServiceApplication {
    // Implementation
}

// 3. Tạo API Gateway
@SpringBootApplication
@EnableZuulProxy
public class ApiGatewayApplication {
    // Implementation
}
```

### Exercise 3: Performance Optimization
Tối ưu hóa performance với caching, database optimization và monitoring:

```java
// 1. Implement caching strategy
@Service
public class ProductService {
    @Cacheable(value = "products", key = "#id")
    public Product getProduct(Long id) {
        // Implementation
    }
}

// 2. Database optimization
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE p.category = :category")
    List<Product> findByCategory(@Param("category") String category);
}

// 3. Custom metrics
@Component
public class ProductMetrics {
    // Implementation
}
```

## 📁 GitHub Repository

🔗 **Repository**: [java-oop-tutorial-2025](https://github.com/your-username/java-oop-tutorial-2025)

**Cấu trúc project:**
```
java-oop-tutorial-2025/
├── user-service/           # Spring Boot 3.x microservice
├── order-service/          # Order management service
├── inventory-service/      # Inventory management service
├── api-gateway/           # API Gateway với Spring Cloud
├── shared-lib/            # Shared libraries và DTOs
├── docker/               # Docker configurations
├── k8s/                  # Kubernetes manifests
├── docs/                 # Documentation
└── README.md             # Setup instructions
```

**Setup Instructions:**
```bash
# Clone repository
git clone https://github.com/your-username/java-oop-tutorial-2025.git
cd java-oop-tutorial-2025

# Build all services
./mvnw clean install

# Run with Docker Compose
docker-compose up -d

# Run with Kubernetes
kubectl apply -f k8s/

# Run tests
./mvnw test
```

## 📚 Tài liệu tham khảo

### Official Documentation
- [Spring Boot 3.x Documentation](https://spring.io/projects/spring-boot)
- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [Java 21 Documentation](https://docs.oracle.com/en/java/javase/21/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

### Books & Resources
- [Effective Java by Joshua Bloch](https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/)
- [Design Patterns by Gang of Four](https://www.oreilly.com/library/view/design-patterns-elements/0201633612/)
- [Clean Code by Robert Martin](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [Spring in Action](https://www.manning.com/books/spring-in-action-sixth-edition)

### Online Courses
- [Spring Boot 3.x Course](https://www.udemy.com/course/spring-boot-3/)
- [Microservices với Spring Cloud](https://www.pluralsight.com/courses/spring-cloud-microservices)
- [Java 21 Features Course](https://www.coursera.org/learn/java-21-features)
- [Cloud-Native Java Development](https://www.coursera.org/learn/cloud-native-java)

## 🎉 Kết luận

Chúng ta đã tìm hiểu về:

- ✅ **Advanced OOP Concepts**: Static, Overloading, Overriding với Java 17/21
- ✅ **Modern Java Features**: Records, Pattern Matching, Sealed Classes, Virtual Threads
- ✅ **Design Patterns**: Singleton, Factory, Observer với Spring Boot 3.x
- ✅ **SOLID Principles**: SRP, OCP, LSP trong Cloud-Native Development
- ✅ **Generic Programming**: Type safety và reusability
- ✅ **Exception Handling**: Custom exceptions và best practices
- ✅ **Reflection & Annotations**: Runtime introspection với Spring Boot
- ✅ **Spring Boot 3.x Integration**: Repository, Controller, Configuration patterns
- ✅ **Cloud-Native Development**: Microservices, Docker, Kubernetes
- ✅ **Performance Optimization**: JVM tuning, caching, monitoring

## 🚀 Hướng dẫn tiếp theo

**Cho Sinh viên IT & Junior Developers:**
1. Thực hành các exercises trong GitHub repository
2. Xây dựng microservices project với Spring Boot 3.x
3. Học về [Spring Security với OAuth2](link-to-security-post)

**Cho Career Changers:**
1. Master modern Java features và Spring Boot 3.x
2. Thực hành cloud-native development với Docker/Kubernetes
3. Tham gia [Java Community](link-to-community) và contribute to open source

**Cho Backend/Frontend Developers:**
1. Tích hợp Spring Boot backend với modern frontend frameworks
2. Học về [API Design và GraphQL](link-to-api-post)
3. Thực hành [Event-Driven Architecture](link-to-events-post)

---

*Bạn có câu hỏi nào về OOP nâng cao, Modern Java features, hoặc Spring Boot 3.x không? Hãy để lại comment hoặc liên hệ với mình!* 🚀

**🔗 Liên kết hữu ích:**
- [GitHub Repository](https://github.com/your-username/java-oop-tutorial-2025)
- [Spring Boot 3.x Documentation](https://spring.io/projects/spring-boot)
- [Java 21 Documentation](https://docs.oracle.com/en/java/javase/21/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
