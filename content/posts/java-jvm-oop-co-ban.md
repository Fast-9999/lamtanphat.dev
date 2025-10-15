---
title: "JVM và OOP Cơ Bản trong Java 2025"
description: "Tìm hiểu về Java Virtual Machine và các khái niệm Object-Oriented Programming cơ bản với Java 17/21 LTS và modern features"
date: 2025-02-08
categories: ["java-mastery-2025"]
tags: ["java", "jvm", "oop", "fundamentals", "java17", "java21", "modern-java", "2025"]
featured: true
image: "https://branium.pro/wp-content/uploads/2022/06/Java-2025.webp"
draft: false
---

# JVM và OOP Cơ Bản trong Java 2025

Java Virtual Machine (JVM) và Object-Oriented Programming (OOP) là hai nền tảng cốt lõi của Java. Trong bài viết này, chúng ta sẽ khám phá cách JVM hoạt động và các khái niệm OOP cơ bản trong Java, với focus vào **Java 17/21 LTS** và các modern features cho năm 2025.

## 🎯 Mục tiêu bài viết

Sau khi đọc xong bài viết này, bạn sẽ hiểu:
- JVM là gì và cách hoạt động với Java 17/21
- Quá trình biên dịch và thực thi Java hiện đại
- Các khái niệm OOP cơ bản: Class, Object, Inheritance, Polymorphism
- Modern Java features: Records, Pattern Matching, Sealed Classes
- Cách áp dụng OOP trong cloud-native development 2025
- Best practices cho performance optimization

## 🖥️ Java Virtual Machine (JVM)

### JVM là gì?

**Java Virtual Machine (JVM)** là một máy ảo cho phép chạy các chương trình Java trên bất kỳ hệ điều hành nào. Đây là thành phần quan trọng của Java Platform.

### 🚀 Java 17/21 LTS - Tại sao quan trọng cho 2025?

**Java 17** (LTS) và **Java 21** (LTS) là những phiên bản được khuyến nghị cho production trong năm 2025:

- **Java 17**: LTS từ 2021, ổn định và được hỗ trợ lâu dài
- **Java 21**: LTS mới nhất (2023), với nhiều performance improvements
- **Modern Features**: Records, Pattern Matching, Sealed Classes, Virtual Threads
- **Cloud-Native Ready**: Tối ưu cho containerization và microservices

### Kiến trúc JVM

```
┌─────────────────────────────────────┐
│           Java Application          │
├─────────────────────────────────────┤
│           Java API                  │
├─────────────────────────────────────┤
│              JVM                   │
│  ┌─────────────┬─────────────────┐  │
│  │ ClassLoader │ Execution Engine│  │
│  └─────────────┴─────────────────┘  │
│  ┌─────────────────────────────────┐│
│  │        Runtime Data Areas        ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│         Operating System            │
└─────────────────────────────────────┘
```

### Quá trình biên dịch và thực thi

1. **Source Code** (.java) → **javac** → **Bytecode** (.class)
2. **Bytecode** → **JVM** → **Machine Code** → **Execution**

### Ví dụ minh họa

```java
// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, JVM!");
    }
}
```

**Biên dịch:**
```bash
javac HelloWorld.java  # Tạo HelloWorld.class
```

**Thực thi:**
```bash
java HelloWorld  # JVM thực thi bytecode
```

## 🏗️ Object-Oriented Programming (OOP)

### 4 Nguyên lý cơ bản của OOP

#### 1. Encapsulation (Đóng gói)

**Đóng gói** là việc ẩn giấu thông tin chi tiết bên trong và chỉ cung cấp interface công khai.

```java
public class BankAccount {
    // Private fields - ẩn giấu thông tin
    private String accountNumber;
    private double balance;
    
    // Public methods - interface công khai
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    public double getBalance() {
        return balance;
    }
    
    public String getAccountNumber() {
        return accountNumber;
    }
}
```

#### 2. Inheritance (Kế thừa)

**Kế thừa** cho phép một class kế thừa properties và methods từ class khác.

```java
// Parent class
public class Animal {
    protected String name;
    protected int age;
    
    public void eat() {
        System.out.println(name + " is eating");
    }
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Child class
public class Dog extends Animal {
    private String breed;
    
    public Dog(String name, int age, String breed) {
        this.name = name;
        this.age = age;
        this.breed = breed;
    }
    
    public void bark() {
        System.out.println(name + " is barking");
    }
    
    @Override
    public void eat() {
        System.out.println(name + " the " + breed + " is eating dog food");
    }
}
```

#### 3. Polymorphism (Đa hình)

**Đa hình** cho phép một object có thể có nhiều hình thái khác nhau.

```java
public class PolymorphismExample {
    public static void main(String[] args) {
        Animal[] animals = {
            new Dog("Buddy", 3, "Golden Retriever"),
            new Cat("Whiskers", 2),
            new Bird("Tweety", 1)
        };
        
        // Polymorphism - cùng method nhưng hành vi khác nhau
        for (Animal animal : animals) {
            animal.eat();  // Mỗi loại động vật ăn khác nhau
        }
    }
}
```

#### 4. Abstraction (Trừu tượng hóa)

**Trừu tượng hóa** là việc ẩn giấu chi tiết phức tạp và chỉ hiển thị những gì cần thiết.

```java
// Abstract class
public abstract class Vehicle {
    protected String brand;
    protected String model;
    
    // Abstract method - phải được implement bởi subclass
    public abstract void start();
    
    public abstract void stop();
    
    // Concrete method
    public void displayInfo() {
        System.out.println("Brand: " + brand + ", Model: " + model);
    }
}

// Concrete class
public class Car extends Vehicle {
    public Car(String brand, String model) {
        this.brand = brand;
        this.model = model;
    }
    
    @Override
    public void start() {
        System.out.println("Car engine started");
    }
    
    @Override
    public void stop() {
        System.out.println("Car engine stopped");
    }
}
```

## 🆕 Modern Java Features (2025)

### 1. Records - Immutable Data Classes

**Records** (Java 14+) giúp tạo immutable data classes một cách đơn giản:

```java
// ✅ Modern way với Records
public record User(String name, String email, int age) {
    // Tự động có constructor, getters, equals, hashCode, toString
}

// ❌ Old way với traditional class
public class User {
    private final String name;
    private final String email;
    private final int age;
    
    // Cần viết constructor, getters, equals, hashCode, toString...
}

// Sử dụng Records
public class UserService {
    public void processUser() {
        User user = new User("John Doe", "john@example.com", 30);
        System.out.println(user.name()); // Getter tự động
        System.out.println(user); // toString tự động
    }
}
```

### 2. Pattern Matching (Java 17+)

**Pattern Matching** giúp code sạch hơn khi làm việc với types:

```java
// ✅ Modern way với Pattern Matching
public String processObject(Object obj) {
    return switch (obj) {
        case String s -> "String: " + s;
        case Integer i -> "Integer: " + i;
        case User u -> "User: " + u.name();
        case null -> "Null object";
        default -> "Unknown type";
    };
}

// ❌ Old way
public String processObject(Object obj) {
    if (obj instanceof String) {
        String s = (String) obj;
        return "String: " + s;
    } else if (obj instanceof Integer) {
        Integer i = (Integer) obj;
        return "Integer: " + i;
    }
    // ... more instanceof checks
    return "Unknown type";
}
```

### 3. Sealed Classes (Java 17+)

**Sealed Classes** cho phép kiểm soát inheritance:

```java
// Sealed class - chỉ cho phép một số class kế thừa
public sealed class Shape 
    permits Circle, Rectangle, Triangle {
    
    public abstract double area();
}

// Các class được phép kế thừa
public final class Circle extends Shape {
    private final double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

public final class Rectangle extends Shape {
    private final double width, height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double area() {
        return width * height;
    }
}
```

### 4. Virtual Threads (Java 21) - Game Changer cho 2025

**Virtual Threads** giúp xử lý concurrent programming hiệu quả hơn:

```java
// ✅ Modern way với Virtual Threads
public class ModernWebService {
    public void handleRequests() {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 10000; i++) {
                executor.submit(() -> {
                    // Xử lý request - có thể tạo hàng triệu virtual threads
                    processRequest();
                });
            }
        }
    }
    
    private void processRequest() {
        // Simulate I/O operations
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

// ❌ Old way với traditional threads
public class OldWebService {
    public void handleRequests() {
        ExecutorService executor = Executors.newFixedThreadPool(100);
        // Giới hạn bởi số lượng threads có thể tạo
    }
}
```

## 🔧 Interface và Abstract Class

### Interface

**Interface** định nghĩa contract mà các class phải implement.

```java
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

public class Circle implements Drawable {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing circle with radius: " + radius);
    }
    
    @Override
    public void erase() {
        System.out.println("Erasing circle");
    }
}
```

### So sánh Interface vs Abstract Class

| Feature | Interface | Abstract Class |
|---------|-----------|----------------|
| Multiple inheritance | ✅ Có | ❌ Không |
| Fields | Chỉ constants | Có thể có instance variables |
| Methods | Chỉ abstract methods | Có thể có concrete methods |
| Access modifiers | Public by default | Có thể có private/protected |

## 🎯 Ví dụ thực tế: Hệ thống quản lý thư viện

```java
// Abstract base class
public abstract class LibraryItem {
    protected String id;
    protected String title;
    protected boolean isAvailable;
    
    public LibraryItem(String id, String title) {
        this.id = id;
        this.title = title;
        this.isAvailable = true;
    }
    
    // Abstract methods
    public abstract void displayInfo();
    public abstract int getLoanPeriod();
    
    // Concrete methods
    public void borrow() {
        if (isAvailable) {
            isAvailable = false;
            System.out.println(title + " has been borrowed");
        } else {
            System.out.println(title + " is not available");
        }
    }
    
    public void returnItem() {
        isAvailable = true;
        System.out.println(title + " has been returned");
    }
}

// Concrete classes
public class Book extends LibraryItem {
    private String author;
    private int pages;
    
    public Book(String id, String title, String author, int pages) {
        super(id, title);
        this.author = author;
        this.pages = pages;
    }
    
    @Override
    public void displayInfo() {
        System.out.println("Book: " + title + " by " + author + 
                          " (" + pages + " pages)");
    }
    
    @Override
    public int getLoanPeriod() {
        return 14; // 2 weeks
    }
}

public class DVD extends LibraryItem {
    private String director;
    private int duration; // minutes
    
    public DVD(String id, String title, String director, int duration) {
        super(id, title);
        this.director = director;
        this.duration = duration;
    }
    
    @Override
    public void displayInfo() {
        System.out.println("DVD: " + title + " directed by " + director + 
                          " (" + duration + " minutes)");
    }
    
    @Override
    public int getLoanPeriod() {
        return 7; // 1 week
    }
}

// Main class để test
public class LibrarySystem {
    public static void main(String[] args) {
        LibraryItem[] items = {
            new Book("B001", "Java Programming", "John Doe", 300),
            new DVD("D001", "Programming Tutorial", "Jane Smith", 120)
        };
        
        // Polymorphism in action
        for (LibraryItem item : items) {
            item.displayInfo();
            item.borrow();
            System.out.println("Loan period: " + item.getLoanPeriod() + " days");
            System.out.println("---");
        }
    }
}
```

## 🚀 Best Practices cho OOP

### 1. Single Responsibility Principle (SRP)

Mỗi class chỉ nên có một lý do để thay đổi.

```java
// ❌ Bad - nhiều trách nhiệm
public class User {
    private String name;
    private String email;
    
    public void saveToDatabase() { /* ... */ }
    public void sendEmail() { /* ... */ }
    public void validateEmail() { /* ... */ }
}

// ✅ Good - tách biệt trách nhiệm
public class User {
    private String name;
    private String email;
    // Chỉ chứa data và basic operations
}

public class UserRepository {
    public void save(User user) { /* ... */ }
}

public class EmailService {
    public void sendEmail(String email, String message) { /* ... */ }
}

public class EmailValidator {
    public boolean isValid(String email) { /* ... */ }
}
```

### 2. Composition over Inheritance

Ưu tiên composition thay vì inheritance khi có thể.

```java
// ❌ Bad - deep inheritance
public class Animal { }
public class Mammal extends Animal { }
public class Dog extends Mammal { }
public class GoldenRetriever extends Dog { }

// ✅ Good - composition
public class Dog {
    private Animal animal;
    private Breed breed;
    
    public Dog(Animal animal, Breed breed) {
        this.animal = animal;
        this.breed = breed;
    }
}
```

## ☁️ Cloud-Native Development với Java 2025

### Containerization với Docker

```dockerfile
# Dockerfile cho Java 21 application
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy application
COPY target/app.jar app.jar

# JVM tuning cho containers
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseG1GC -XX:MaxGCPauseMillis=200"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
```

### Spring Boot 3.x Integration

```java
// Modern Spring Boot 3.x với Java 21
@RestController
@RequestMapping("/api/v1")
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody @Valid CreateUserRequest request) {
        User user = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}

// Record cho DTO
public record CreateUserRequest(
    @NotBlank String name,
    @Email String email,
    @Min(18) int age
) {}
```

### Microservices với Virtual Threads

```java
// Service với Virtual Threads cho high concurrency
@Service
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final PaymentService paymentService;
    private final InventoryService inventoryService;
    
    public OrderService(OrderRepository orderRepository, 
                       PaymentService paymentService,
                       InventoryService inventoryService) {
        this.orderRepository = orderRepository;
        this.paymentService = paymentService;
        this.inventoryService = inventoryService;
    }
    
    @Async("virtualThreadExecutor")
    public CompletableFuture<Order> processOrder(OrderRequest request) {
        return CompletableFuture.supplyAsync(() -> {
            // Process order với virtual threads
            var order = createOrder(request);
            processPayment(order);
            updateInventory(order);
            return order;
        });
    }
    
    @Bean
    public Executor virtualThreadExecutor() {
        return Executors.newVirtualThreadPerTaskExecutor();
    }
}
```

## ⚡ Performance Optimization cho JVM 2025

### JVM Tuning cho Production

```bash
# JVM options cho production với Java 21
java -jar app.jar \
  -Xmx2g -Xms2g \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UseStringDeduplication \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+UseZGC \
  -XX:+UseTransparentHugePages \
  -Djava.security.egd=file:/dev/./urandom
```

### Memory Management Best Practices

```java
// ✅ Efficient memory usage với Records
public record Product(String id, String name, BigDecimal price) {
    // Immutable, efficient memory usage
}

// ✅ Proper resource management
public class DatabaseService implements AutoCloseable {
    private final Connection connection;
    
    public DatabaseService() throws SQLException {
        this.connection = DriverManager.getConnection("jdbc:postgresql://localhost/db");
    }
    
    @Override
    public void close() throws SQLException {
        if (connection != null && !connection.isClosed()) {
            connection.close();
        }
    }
}

// Sử dụng try-with-resources
try (var dbService = new DatabaseService()) {
    // Auto-close resources
    dbService.executeQuery("SELECT * FROM users");
}
```

## 🧪 Unit Testing với OOP

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class BankAccountTest {
    @Test
    public void testDeposit() {
        BankAccount account = new BankAccount("12345", 1000.0);
        account.deposit(500.0);
        assertEquals(1500.0, account.getBalance());
    }
    
    @Test
    public void testWithdraw() {
        BankAccount account = new BankAccount("12345", 1000.0);
        account.withdraw(300.0);
        assertEquals(700.0, account.getBalance());
    }
}
```

## 🛠️ Bài tập thực hành

### Exercise 1: Modern Java Features
Tạo một ứng dụng quản lý sách sử dụng Records và Pattern Matching:

```java
// 1. Tạo Book record
public record Book(String isbn, String title, String author, double price) {}

// 2. Tạo BookService với Pattern Matching
public class BookService {
    public String processBook(Object book) {
        return switch (book) {
            case Book b -> "Book: " + b.title() + " by " + b.author();
            case String s -> "String: " + s;
            case null -> "Null book";
            default -> "Unknown type";
        };
    }
}
```

### Exercise 2: Cloud-Native Application
Xây dựng REST API với Spring Boot 3.x và Virtual Threads:

```java
// 1. Tạo User record
public record User(Long id, String name, String email) {}

// 2. Tạo UserController
@RestController
@RequestMapping("/api/users")
public class UserController {
    // Implement CRUD operations với Virtual Threads
}
```

### Exercise 3: Performance Optimization
Tối ưu hóa memory usage và JVM performance:

```java
// 1. Sử dụng Records thay vì traditional classes
// 2. Implement proper resource management
// 3. Tune JVM parameters
```

## 📁 GitHub Repository

🔗 **Repository**: [java-jvm-oop-2025](https://github.com/your-username/java-jvm-oop-2025)

**Cấu trúc project:**
```
java-jvm-oop-2025/
├── src/main/java/
│   ├── modern/          # Modern Java features
│   ├── oop/            # OOP examples
│   ├── cloud/          # Cloud-native examples
│   └── performance/    # Performance optimization
├── src/test/java/      # Unit tests
├── docker/            # Docker configurations
├── docs/              # Documentation
└── README.md          # Setup instructions
```

**Setup Instructions:**
```bash
# Clone repository
git clone https://github.com/your-username/java-jvm-oop-2025.git
cd java-jvm-oop-2025

# Build với Java 21
./mvnw clean compile

# Run tests
./mvnw test

# Run application
./mvnw spring-boot:run
```

## 📚 Tài liệu tham khảo

### Official Documentation
- [Oracle Java 21 Documentation](https://docs.oracle.com/en/java/javase/21/)
- [JVM Specification](https://docs.oracle.com/javase/specs/jvms/se21/html/)
- [Spring Boot 3.x Documentation](https://spring.io/projects/spring-boot)

### Books & Resources
- [Effective Java by Joshua Bloch](https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/)
- [Java Concurrency in Practice](https://www.oreilly.com/library/view/java-concurrency-in/0321349601/)
- [Modern Java in Action](https://www.manning.com/books/modern-java-in-action)

### Online Courses
- [Java 21 Features Course](https://www.pluralsight.com/courses/java-21-features)
- [Spring Boot 3.x Course](https://www.udemy.com/course/spring-boot-3/)
- [Cloud-Native Java Development](https://www.coursera.org/learn/cloud-native-java)

## 🎉 Kết luận

Chúng ta đã tìm hiểu về:

- ✅ **JVM**: Cách hoạt động và kiến trúc với Java 17/21
- ✅ **OOP**: 4 nguyên lý cơ bản và modern applications
- ✅ **Modern Java Features**: Records, Pattern Matching, Sealed Classes, Virtual Threads
- ✅ **Cloud-Native Development**: Docker, Spring Boot 3.x, Microservices
- ✅ **Performance Optimization**: JVM tuning, memory management
- ✅ **Best Practices**: SRP, Composition over Inheritance, Resource management
- ✅ **Practical Exercises**: Hands-on coding với GitHub repository

## 🚀 Hướng dẫn tiếp theo

**Cho Sinh viên IT & Junior Developers:**
1. Thực hành các exercises trong GitHub repository
2. Đọc thêm về [Spring Boot 3.x Tutorial](link-to-next-post)
3. Học về [Java Design Patterns](link-to-patterns-post)

**Cho Career Changers:**
1. Xây dựng project thực tế với modern Java features
2. Học về [Cloud-Native Java Development](link-to-cloud-post)
3. Tham gia [Java Community](link-to-community)

**Cho Backend/Frontend Developers:**
1. Tích hợp Java backend với modern frontend frameworks
2. Học về [Microservices Architecture](link-to-microservices-post)
3. Thực hành [API Development với Spring Boot](link-to-api-post)

---

*Bạn có câu hỏi nào về JVM, OOP, hoặc Modern Java features không? Hãy để lại comment hoặc liên hệ với mình!* 🚀

**🔗 Liên kết hữu ích:**
- [GitHub Repository](https://github.com/your-username/java-jvm-oop-2025)
- [Java 21 Documentation](https://docs.oracle.com/en/java/javase/21/)
- [Spring Boot 3.x Guide](https://spring.io/projects/spring-boot)
