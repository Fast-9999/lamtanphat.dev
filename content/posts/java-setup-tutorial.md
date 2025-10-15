---
title: "Java Development Environment Setup 2025: Modern Tools & Cloud-Native"
description: "Cài đặt và cấu hình môi trường phát triển Java hiện đại với Java 17/21 LTS, Spring Boot 3.x, Docker, Gradle và Cloud-Native tools"
date: 2025-02-01
categories: ["java-mastery-2025"]
tags: ["java", "setup", "development", "tutorial", "java17", "java21", "spring-boot-3", "docker", "gradle", "cloud-native", "2025"]
featured: true
image: "https://instituteofcoding.org/wp-content/uploads/2025/01/pexels-luis-gomes-166706-546819-scaled.jpg"
draft: false
---

# Java Development Environment Setup 2025: Modern Tools & Cloud-Native

Việc setup môi trường phát triển Java đúng cách là bước đầu tiên quan trọng trong hành trình học lập trình Java. Trong bài viết này, mình sẽ hướng dẫn chi tiết cách cài đặt và cấu hình môi trường Java development hiện đại với **Java 17/21 LTS**, **Spring Boot 3.x**, **Docker**, **Gradle** và các **Cloud-Native tools** cho năm 2025.

## 🎯 Mục tiêu bài viết

Sau khi đọc xong bài viết này, bạn sẽ biết cách:
- Cài đặt JDK 17/21 LTS (Java Development Kit)
- Cấu hình biến môi trường JAVA_HOME
- Cài đặt và cấu hình IDE hiện đại (IntelliJ IDEA/VS Code)
- Tạo Spring Boot 3.x project đầu tiên
- Sử dụng Gradle (modern build tool) cho quản lý dependencies
- Containerization với Docker
- GitHub integration và modern development workflow
- CI/CD pipeline setup
- Cloud-Native development tools

## 📋 Yêu cầu hệ thống

- **Windows 10/11**, **macOS**, hoặc **Linux**
- Kết nối internet để tải các công cụ cần thiết
- Ít nhất 8GB RAM (khuyến nghị 16GB+ cho development)
- Docker Desktop (cho containerization)
- Git (cho version control)

## 🔧 Bước 1: Cài đặt JDK

### Chọn phiên bản JDK cho 2025

Hiện tại có các lựa chọn chính:

1. **Eclipse Temurin (Adoptium)** - Phiên bản mã nguồn mở (khuyến nghị)
2. **Oracle JDK** - Phiên bản thương mại
3. **Amazon Corretto** - Phiên bản từ Amazon
4. **Microsoft Build of OpenJDK** - Phiên bản từ Microsoft

**Khuyến nghị cho 2025**: Sử dụng **Eclipse Temurin 17 LTS** hoặc **Eclipse Temurin 21 LTS**

### Tại sao chọn Java 17/21 LTS?

- **Java 17 LTS**: Ổn định, được hỗ trợ lâu dài, tương thích với Spring Boot 3.x
- **Java 21 LTS**: Phiên bản mới nhất với Virtual Threads, Pattern Matching, Records
- **LTS Support**: Được hỗ trợ ít nhất 8 năm
- **Enterprise Ready**: Được sử dụng rộng rãi trong production

### Cài đặt trên Windows

#### Cách 1: Sử dụng Eclipse Temurin (Khuyến nghị)

1. Truy cập [Eclipse Temurin](https://adoptium.net/)
2. Chọn **Eclipse Temurin 17** (LTS) hoặc **21** (LTS)
3. Chọn **Windows x64**
4. Tải file `.msi`
5. Chạy file cài đặt và làm theo hướng dẫn

#### Cách 2: Sử dụng Chocolatey (Package Manager)

```powershell
# Cài đặt Chocolatey (nếu chưa có)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Cài đặt Java 17
choco install temurin17

# Hoặc Java 21
choco install temurin21
```

#### Cách 3: Sử dụng SDKMAN (Cross-platform)

```bash
# Cài đặt SDKMAN
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Cài đặt Java 17
sdk install java 17.0.2-tem

# Hoặc Java 21
sdk install java 21.0.1-tem
```

### Cài đặt trên macOS

#### Cách 1: Sử dụng Homebrew (Khuyến nghị)

```bash
# Cài đặt Homebrew (nếu chưa có)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Cài đặt Java 17
brew install openjdk@17

# Hoặc Java 21
brew install openjdk@21

# Cấu hình JAVA_HOME
echo 'export JAVA_HOME=/opt/homebrew/opt/openjdk@17' >> ~/.zshrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

#### Cách 2: Sử dụng SDKMAN

```bash
# Cài đặt SDKMAN
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Cài đặt Java 17
sdk install java 17.0.2-tem

# Hoặc Java 21
sdk install java 21.0.1-tem
```

### Cài đặt trên Linux (Ubuntu/Debian)

#### Cách 1: Sử dụng APT Package Manager

```bash
# Cập nhật package list
sudo apt update

# Cài đặt OpenJDK 17
sudo apt install openjdk-17-jdk

# Hoặc OpenJDK 21
sudo apt install openjdk-21-jdk

# Cấu hình JAVA_HOME
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Kiểm tra phiên bản
java -version
javac -version
```

#### Cách 2: Sử dụng SDKMAN

```bash
# Cài đặt SDKMAN
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Cài đặt Java 17
sdk install java 17.0.2-tem

# Hoặc Java 21
sdk install java 21.0.1-tem
```

## 🌍 Bước 2: Cấu hình biến môi trường

### Windows

1. Mở **System Properties** → **Advanced** → **Environment Variables**
2. Tạo biến mới:
   - **Name**: `JAVA_HOME`
   - **Value**: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot` (đường dẫn thực tế)
3. Thêm vào **Path**:
   - `%JAVA_HOME%\bin`

### macOS/Linux

Thêm vào file `~/.bashrc` hoặc `~/.zshrc`:

```bash
# Java Home
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```

Reload shell:
```bash
source ~/.bashrc
# hoặc
source ~/.zshrc
```

## 🚀 Bước 3: Cài đặt Build Tools

### Gradle (Modern Build Tool - Khuyến nghị cho 2025)

Gradle là build tool hiện đại, nhanh hơn Maven và có syntax linh hoạt hơn.

#### Cài đặt Gradle

```bash
# Sử dụng SDKMAN (Cross-platform)
sdk install gradle

# Hoặc tải từ https://gradle.org/releases/
# Windows: Tải và giải nén, thêm vào PATH
# macOS: brew install gradle
# Linux: sudo apt install gradle
```

#### Tạo Gradle Project

```bash
# Tạo Spring Boot project với Gradle
curl https://start.spring.io/starter.zip \
  -d dependencies=web,data-jpa,validation \
  -d type=gradle-project \
  -d language=java \
  -d bootVersion=3.2.0 \
  -d baseDir=my-spring-app \
  -o my-spring-app.zip

# Giải nén và chạy
unzip my-spring-app.zip
cd my-spring-app
./gradlew bootRun
```

### Maven (Traditional Build Tool)

```bash
# Cài đặt Maven
# Windows: choco install maven
# macOS: brew install maven
# Linux: sudo apt install maven
```

## 💻 Bước 4: Cài đặt IDE

### IntelliJ IDEA Community Edition (Khuyến nghị cho 2025)

1. Truy cập [jetbrains.com](https://www.jetbrains.com/idea/download/)
2. Tải **Community Edition** (miễn phí)
3. Cài đặt và khởi động
4. Cấu hình JDK trong **File** → **Project Structure** → **SDKs**
5. Cài đặt plugins:
   - **Spring Boot Assistant**
   - **Docker**
   - **Kubernetes**
   - **GitHub Copilot** (nếu có license)

### Visual Studio Code (Popular Choice 2025)

1. Cài đặt VS Code từ [code.visualstudio.com](https://code.visualstudio.com/)
2. Cài đặt extensions:
   - **Extension Pack for Java** (Microsoft)
   - **Spring Boot Extension Pack**
   - **Docker**
   - **Kubernetes**
   - **GitHub Copilot**
3. Cấu hình JDK trong settings:
   ```json
   {
     "java.home": "/path/to/your/jdk",
     "java.configuration.runtimes": [
       {
         "name": "JavaSE-17",
         "path": "/path/to/your/jdk17"
       }
     ]
   }
   ```

### Eclipse IDE

1. Truy cập [eclipse.org](https://www.eclipse.org/downloads/)
2. Tải **Eclipse IDE for Java Developers**
3. Cài đặt và khởi động
4. Cấu hình JDK trong **Window** → **Preferences** → **Java** → **Installed JREs**

## 🏗️ Bước 5: Tạo Spring Boot 3.x Project đầu tiên

### Sử dụng Spring Initializr (Khuyến nghị)

#### Cách 1: Sử dụng Web Interface

1. Truy cập [start.spring.io](https://start.spring.io/)
2. Cấu hình project:
   - **Project**: Gradle Project
   - **Language**: Java
   - **Spring Boot**: 3.2.0 (latest)
   - **Group**: com.devnetinsights
   - **Artifact**: my-spring-app
   - **Name**: My Spring App
   - **Package name**: com.devnetinsights.myapp
3. Chọn dependencies:
   - **Spring Web**
   - **Spring Data JPA**
   - **Validation**
   - **Spring Boot DevTools**
4. Click **Generate** và tải file ZIP

#### Cách 2: Sử dụng Command Line

```bash
# Tạo Spring Boot project với Gradle
curl https://start.spring.io/starter.zip \
  -d dependencies=web,data-jpa,validation,devtools \
  -d type=gradle-project \
  -d language=java \
  -d bootVersion=3.2.0 \
  -d groupId=com.devnetinsights \
  -d artifactId=my-spring-app \
  -d name=MySpringApp \
  -d packageName=com.devnetinsights.myapp \
  -o my-spring-app.zip

# Giải nén và chạy
unzip my-spring-app.zip
cd my-spring-app
./gradlew bootRun
```

### Code mẫu Spring Boot 3.x

```java
// Main Application Class
@SpringBootApplication
public class MySpringAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(MySpringAppApplication.class, args);
    }
}

// REST Controller
@RestController
@RequestMapping("/api")
public class HelloController {
    
    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello, Spring Boot 3.x!");
    }
    
    @GetMapping("/hello/{name}")
    public ResponseEntity<String> helloWithName(@PathVariable String name) {
        return ResponseEntity.ok("Hello, " + name + "!");
    }
}

// Service Layer
@Service
public class HelloService {
    
    public String getGreeting(String name) {
        return "Welcome to Spring Boot 3.x, " + name + "!";
    }
}
```

### Chạy Spring Boot Application

```bash
# Sử dụng Gradle
./gradlew bootRun

# Hoặc build và chạy JAR
./gradlew build
java -jar build/libs/my-spring-app-0.0.1-SNAPSHOT.jar

# Sử dụng Maven
./mvnw spring-boot:run
```

### Test API

```bash
# Test endpoint
curl http://localhost:8080/api/hello
curl http://localhost:8080/api/hello/DevNet
```

## 🐳 Bước 6: Docker Containerization

### Cài đặt Docker Desktop

1. Truy cập [docker.com](https://www.docker.com/products/docker-desktop/)
2. Tải và cài đặt Docker Desktop
3. Khởi động Docker Desktop

### Tạo Dockerfile cho Spring Boot App

```dockerfile
# Dockerfile
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy Gradle wrapper và build files
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Copy source code
COPY src src

# Build application
RUN ./gradlew build -x test

# Expose port
EXPOSE 8080

# Run application
CMD ["java", "-jar", "build/libs/my-spring-app-0.0.1-SNAPSHOT.jar"]
```

### Build và chạy Docker Container

```bash
# Build Docker image
docker build -t my-spring-app .

# Chạy container
docker run -p 8080:8080 my-spring-app

# Chạy với environment variables
docker run -p 8080:8080 -e SPRING_PROFILES_ACTIVE=prod my-spring-app
```

### Docker Compose cho Development

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=dev
    volumes:
      - .:/app
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
# Chạy với Docker Compose
docker-compose up -d

# Xem logs
docker-compose logs -f app
```

## 📦 Bước 7: Quản lý Dependencies với Gradle

### Gradle Build File (build.gradle)

```gradle
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.2.0'
    id 'io.spring.dependency-management' version '1.1.4'
}

group = 'com.devnetinsights'
version = '0.0.1-SNAPSHOT'

java {
    sourceCompatibility = '17'
}

configurations {
    compileOnly {
        extendsFrom annotationProcessor
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
    
    compileOnly 'org.projectlombok:lombok'
    runtimeOnly 'com.h2database:h2'
    runtimeOnly 'org.postgresql:postgresql'
    
    annotationProcessor 'org.projectlombok:lombok'
    
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.testcontainers:junit-jupiter'
    testImplementation 'org.testcontainers:postgresql'
}

tasks.named('test') {
    useJUnitPlatform()
}
```

### Cấu trúc Gradle Project

```
my-spring-app/
├── build.gradle
├── settings.gradle
├── gradlew
├── gradlew.bat
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── devnetinsights/
│   │   │           └── myapp/
│   │   │               ├── MySpringAppApplication.java
│   │   │               ├── controller/
│   │   │               ├── service/
│   │   │               └── repository/
│   │   └── resources/
│   │       ├── application.yml
│   │       └── static/
│   └── test/
│       └── java/
│           └── com/
│               └── devnetinsights/
│                   └── myapp/
│                       └── MySpringAppApplicationTests.java
└── docker-compose.yml
```

### Gradle Commands

```bash
# Build project
./gradlew build

# Run application
./gradlew bootRun

# Run tests
./gradlew test

# Clean build
./gradlew clean build

# Generate dependency report
./gradlew dependencies

# Run specific task
./gradlew bootJar
```

## 🔗 Bước 8: GitHub Integration và Modern Workflow

### Cài đặt Git

```bash
# Windows: Tải từ git-scm.com
# macOS: brew install git
# Linux: sudo apt install git
```

### Tạo GitHub Repository

1. Truy cập [github.com](https://github.com/)
2. Click **New Repository**
3. Đặt tên: `my-spring-app`
4. Chọn **Public** hoặc **Private**
5. Click **Create Repository**

### Git Commands

```bash
# Khởi tạo Git repository
git init

# Thêm remote origin
git remote add origin https://github.com/your-username/my-spring-app.git

# Thêm files
git add .

# Commit
git commit -m "Initial commit: Spring Boot 3.x project"

# Push to GitHub
git push -u origin main
```

### .gitignore cho Java/Gradle

```gitignore
# Gradle
.gradle/
build/
!gradle/wrapper/gradle-wrapper.jar
!**/src/main/**/build/
!**/src/test/**/build/

# Java
*.class
*.jar
*.war
*.ear
*.nar
hs_err_pid*

# IDE
.idea/
*.iws
*.iml
*.ipr
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Spring Boot
target/
```

## 🚀 Bước 9: CI/CD Pipeline với GitHub Actions

### Tạo GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: password
          POSTGRES_USER: user
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
    - uses: actions/checkout@v4
    
    - name: Set up JDK 17
      uses: actions/setup-java@v4
      with:
        java-version: '17'
        distribution: 'temurin'
        
    - name: Cache Gradle packages
      uses: actions/cache@v3
      with:
        path: |
          ~/.gradle/caches
          ~/.gradle/wrapper
        key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
        restore-keys: |
          ${{ runner.os }}-gradle-
          
    - name: Grant execute permission for gradlew
      run: chmod +x gradlew
      
    - name: Run tests
      run: ./gradlew test
      env:
        SPRING_DATASOURCE_URL: jdbc:postgresql://localhost:5432/testdb
        SPRING_DATASOURCE_USERNAME: user
        SPRING_DATASOURCE_PASSWORD: password
        
    - name: Build application
      run: ./gradlew build -x test
      
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: test-results
        path: build/test-results/
        
  docker:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
      
    - name: Login to Docker Hub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
        
    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: ${{ secrets.DOCKER_USERNAME }}/my-spring-app:latest
        cache-from: type=gha
        cache-to: type=gha,mode=max
```

## 🧪 Bước 10: Viết và chạy Unit Tests

### Modern Testing với Spring Boot Test

```java
// Integration Test
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Testcontainers
class MySpringAppApplicationTests {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Test
    void contextLoads() {
        // Test that the application context loads successfully
    }
}

// Unit Test cho Controller
@WebMvcTest(HelloController.class)
class HelloControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testHelloEndpoint() throws Exception {
        mockMvc.perform(get("/api/hello"))
                .andExpect(status().isOk())
                .andExpect(content().string("Hello, Spring Boot 3.x!"));
    }

    @Test
    void testHelloWithNameEndpoint() throws Exception {
        mockMvc.perform(get("/api/hello/DevNet"))
                .andExpect(status().isOk())
                .andExpect(content().string("Hello, DevNet!"));
    }
}

// Unit Test cho Service
@ExtendWith(MockitoExtension.class)
class HelloServiceTest {

    @InjectMocks
    private HelloService helloService;

    @Test
    void testGetGreeting() {
        String result = helloService.getGreeting("DevNet");
        assertEquals("Welcome to Spring Boot 3.x, DevNet!", result);
    }
}
```

### Chạy tests

```bash
# Chạy tất cả tests
./gradlew test

# Chạy tests với coverage
./gradlew test jacocoTestReport

# Chạy tests với specific profile
./gradlew test -Dspring.profiles.active=test

# Chạy integration tests only
./gradlew integrationTest
```

## 🔍 Kiểm tra cài đặt

### Kiểm tra Java

```bash
java -version
javac -version
echo $JAVA_HOME  # Linux/macOS
echo %JAVA_HOME% # Windows
```

### Kiểm tra Maven

```bash
mvn -version
```

### Kiểm tra IDE

Tạo và chạy một project mẫu để đảm bảo mọi thứ hoạt động.

## 🚨 Troubleshooting

### Lỗi thường gặp

1. **"java is not recognized"**
   - Kiểm tra biến môi trường PATH
   - Restart terminal/command prompt

2. **"JAVA_HOME is not set"**
   - Kiểm tra biến môi trường JAVA_HOME
   - Đảm bảo đường dẫn đúng

3. **IDE không tìm thấy JDK**
   - Cấu hình lại JDK trong IDE settings
   - Restart IDE

## 📚 Tài liệu tham khảo

### Official Documentation
- [Java 17/21 Documentation](https://docs.oracle.com/en/java/javase/17/)
- [Spring Boot 3.x Documentation](https://spring.io/projects/spring-boot)
- [Gradle Documentation](https://docs.gradle.org/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Tools & Resources
- [Eclipse Temurin (Adoptium)](https://adoptium.net/)
- [Spring Initializr](https://start.spring.io/)
- [SDKMAN](https://sdkman.io/)
- [Homebrew](https://brew.sh/)
- [Chocolatey](https://chocolatey.org/)

### IDE Extensions
- [IntelliJ IDEA](https://www.jetbrains.com/idea/)
- [VS Code Java Extensions](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
- [Spring Boot Extension Pack](https://marketplace.visualstudio.com/items?itemName=vmware.vscode-spring-boot)

## 🎉 Kết luận

Bạn đã hoàn thành việc setup môi trường Java development hiện đại cho năm 2025! Bây giờ bạn có thể:

- ✅ Cài đặt và sử dụng Java 17/21 LTS
- ✅ Tạo Spring Boot 3.x projects với Gradle
- ✅ Sử dụng modern IDEs (IntelliJ IDEA, VS Code)
- ✅ Containerization với Docker
- ✅ GitHub integration và CI/CD pipelines
- ✅ Modern testing với Testcontainers
- ✅ Cloud-Native development workflow

## 🚀 Hướng dẫn tiếp theo

**Cho Sinh viên IT & Junior Developers:**
1. Thực hành tạo Spring Boot projects với Spring Initializr
2. Học về [JVM và OOP cơ bản trong Java](link-to-jvm-post)
3. Thực hành Docker containerization

**Cho Career Changers:**
1. Master Spring Boot 3.x và modern Java features
2. Thực hành CI/CD với GitHub Actions
3. Học về [Java OOP Tutorial nâng cao](link-to-oop-post)

**Cho Backend/Frontend Developers:**
1. Tích hợp Spring Boot backend với modern frontend
2. Thực hành API development và testing
3. Học về microservices architecture

---

*Bạn có câu hỏi nào về việc setup môi trường Java development hiện đại không? Hãy để lại comment hoặc liên hệ với mình!* 🚀

**🔗 Liên kết hữu ích:**
- [Spring Initializr](https://start.spring.io/)
- [Eclipse Temurin](https://adoptium.net/)
- [GitHub Actions](https://github.com/features/actions)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
