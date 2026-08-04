# CST243-3 Rapid Application Development
## Lesson 05: Considerations on Developing Rapid Applications

**By:** Milani Yogeswaran

---

## Lesson Learning Outcomes

After successful completion of this lesson you will be able to:

- **Define popular security vulnerabilities**, such as SQL injection and Cross-Site Scripting (XSS), and explain their potential risks to application security.

- **Describe the significance of Unit Testing** in Java and its role in early bug detection and code quality assurance during the development process.

- **Analyze the consequences of rushing into development** without considering security, and evaluate how it can lead to severe impacts on sensitive data and user privacy.

- **Integrate security-conscious coding practices** into the development of rapid applications in Java.

---

## Lesson Outline

### Part I: Security Concerns
- SQL Injection
- Session Hijacking
- Parameter Tampering
- Cross-site Scripting
- Brute Force Attack
- Cross-Site Request Forgery (CSRF) Attacks
- Denial of Service (DoS)
- Protecting Your Web Application
- Securing Passwords

### Part II: Quality Management
- Testing and Unit Testing
- 3A's in Unit Testing
- Unit Test Frameworks

### Part III: How to Become a Good Developer

---

# Part I: Security Concerns

## SQL Injections

### Overview
- A SQL injection attack consists of insertion or "injection" of a SQL query via the input data from the client to the application
- SQL Injection flaws are introduced when software developers create dynamic database queries that include user supplied input

### Prevention Methods

**To avoid SQL injection:**
- Stop writing dynamic queries
- Prevent user supplied input which contains malicious SQL from affecting the logic of the executed query

**Main prevention mechanisms:**
1. Use of Prepared Statements (with Parameterized Queries)
2. Use of Stored Procedures

**Additional security measures:**
- Input validation is a must
- Don't ever give root privileges to the users
- Create separate user and limit operations

### Prepared Statements

Prepared statements represent precompiled SQL statements. Developers pass values as parameters rather than concatenating user input directly.

```java
String query = "SELECT * FROM login WHERE username= ? AND password= ? ";
PreparedStatement pstmt = con.prepareStatement(query);
pstmt.setString(1, username);
pstmt.setString(2, password);
ResultSet rs = pstmt.executeQuery();
```

---

## Session Hijacking

### Definition
- Session Hijacking attack consists of the exploitation of the web session control mechanism, which is normally managed for a session token
- The attack compromises the session token by stealing or predicting a valid session token to gain unauthorized access to the Web Server

### Methods of Compromise
- Predictable session token
- Session Sniffing

### Session Sniffing Attack Process
1. First the attacker uses a sniffer to capture a valid token session called "Session ID"
2. Then he uses the valid token session to gain unauthorized access to the Web Server

### Prevention Methods
- No more plain-text HTTP! Use HTTPS in your login page and sensitive areas
- Secure Cookies
- Logging Out and Ending a Session
  - `session.invalidate()`
- Session Timeout
  - `session.setMaxInactiveInterval(600);`

---

## Parameter Tampering/Manipulation

### Definition
- Parameter tampering attacks are a class of attack that relies on the modification of the parameter data sent between the client and web application

### Top Parameter Manipulation Threats
- Query string manipulation
- Form field manipulation
- Cookie manipulation
- HTTP header manipulation

### Query String Manipulation
- Query string will appear on the browser URL
- Anyone can change those values and submit to the server
- If the server doesn't have appropriate securities to handle it, the attacker can do some harmful things

### Form Field Manipulation
- Web page uses HTML tags
- If one knows HTML, before submit data, he can do some changes to the values
- In Form Field Manipulation, the attacker will change some already defined content and perform the form submission

### Prevention Methods
- **Access Control Check**: Ensure the user is authorized for the requested object or service
  - One way to implement this is to use role-based authorization
- **Validate User Inputs**: Always check user inputs before using it
  - There must be validation performed in server side, since we can't highly depend on the client side validations

---

## Cross-site Scripting (XSS)

### Definition
- Client-side code injection attack
- An attacker can execute malicious scripts into a web application
- Malicious code executes on the browser side and affects users
- XSS vulnerabilities most often happen when user input is incorporated into a web server's response without proper escaping or validation

### Prevention Methods
- Appropriate output encoding or avoidance of threat input
- **Input Validation and Sanitization**: Ensure that dynamically generated pages do not contain undesired tags
- Encode all HTML characters before sending to the user's browser
- Use proper validations

---

## Brute Force Attack

### Definition
- A type of cyberattack in which an attacker tries all possible combinations of usernames and passwords until they find the correct one to gain unauthorized access to an account or system
- Brute force attacks are time-consuming and resource-intensive, but they can be successful if passwords are weak or easily guessable

### Prevention Methods
- Implement Account Lockouts
- Rate Limiting
- Strong Password Policy
- CAPTCHA or reCAPTCHA
- Use MFA where possible – At least 2FA
- Delayed Response
- Logging and Monitoring

---

## Cross-Site Request Forgery (CSRF) Attacks

### Definition
- An attacker tricks a user's web browser into making unintended and potentially harmful requests to a different authenticated website

### Best Practices for Prevention

1. **CSRF Tokens**: Added as hidden fields in forms or headers for AJAX requests
2. **SameSite Attribute**: Limit cross-site sharing
3. **Double Submit Cookies**: A cookie's value is duplicated in both a cookie and a request parameter
4. **Inbuild CSRF Protection**: Critical actions require additional authentication
5. **MFA**: Require MFA for sensitive actions to add an extra layer of security
6. **Security Audits**: Regularly conduct security audits and vulnerability assessments to identify and fix potential CSRF vulnerabilities

---

## Denial of Service (DoS)

### Overview
- Denial of Service attacks aim to make a service unavailable by overwhelming it with traffic
- DoS (single source) vs DDoS (Distributed Denial of Service - multiple sources)

### Impact
- Server becomes unavailable to legitimate users
- Resources are exhausted by the attack

---

## Protecting Your Web Application

### Key Areas
- Input Validation: Ensuring data from users is safe and correctly formatted
- Password Security: Safely managing user passwords
- Preventing Potential Attacks: CSRF, XSS, SQL Injection, Brute Force, DoS, etc.
- Secure Coding Practices: Writing code with security in mind
- Testing the Application: Unit testing is developer's responsibility

---

## Input Validation

### Definition
- Input validation is a fundamental practice to ensure data integrity and protect against security vulnerabilities
- It is a critical security measure to ensure that data provided by users is safe, correctly formatted, and suitable for processing
- By thoroughly validating and sanitizing user input, developers can enhance the overall security of web applications and provide a safer user experience
- It involves checking and sanitizing user input before using it in the application, helping prevent various security vulnerabilities like SQL injection, Cross-Site Scripting (XSS), and more

### Importance
- Web applications often receive user input through several ways: forms, URLs, and other means
- Without proper validation, attackers can exploit vulnerabilities and inject malicious code (e.g., SQL Injection attacks, XSS attacks)
- Input validation helps maintain data integrity, prevents errors, and enhances security

### Types of Validation

#### Server-Side Validation
- Performed on the server before processing the data

#### Client-Side Validation
- Performed in the user's browser using JavaScript for a better user experience
- **Note**: Always prioritize server-side validation as client-side validation can be bypassed by attackers

### Sanitizing and Data Types
- Use the appropriate sanitization method based on the context of data usage
- Ensure that data matches the expected type (e.g., string, integer, date, etc.)
- Type validation helps prevent unintended data manipulation and potential security vulnerabilities

### Length and Format
- Check if the input adheres to a specified length and format (e.g., email, phone number, postal code)
- Limiting input length helps prevent buffer overflows and other related issues

### Database Query Parameters
- When using user input in database queries, utilize prepared statements with placeholders
- Prepared statements automatically handle input escaping, preventing SQL injection attacks

### Error Handling and User Feedback
- Provide clear error messages to users when input validation fails
- Avoid exposing sensitive information in error messages that could be useful to attackers

**Good Message Example**: "Invalid username or password. Please try again"
- Minimal information to potential attackers while still informing the user that there was an issue with the login attempt

**Bad Message Example**: "Your password is incorrect. If you forgot your password, click here to reset it"
- Implicitly confirms that the entered username exists in the system

- Use custom error pages or redirects to handle invalid input gracefully

### Testing and Use of Validation Libraries
- Test the application thoroughly with different test cases to ensure input validation works as expected
- Test for both valid and invalid inputs, edge cases, and potential attack scenarios
- Consider using trusted input validation libraries
- These libraries provide robust and standardized validation functionalities

---

## Password Security

### Characteristics of a Good Password

#### Complexity
- It should be complex
- Encourage users to create complex passwords that include a combination of uppercase and lowercase letters, numbers, and special characters

#### Length
- Length should not be too short
- Recommend using passwords that are at least 12 characters long
- Longer passwords are generally more secure

#### Uniqueness
- Educate users to use unique passwords
- Advise users not to reuse passwords across multiple accounts
- Each online service should have its unique password to prevent a domino effect if one account is compromised

#### Avoid Dictionary Words
- Discourage the use of dictionary words or easily guessable information
- Avoid names, birthdates, or common phrases in passwords

### Security Best Practices

#### Multi-Factor Authentication (MFA)
- MFA adds an extra layer of security, requiring users to provide additional information

#### Regular Password Updates
- Better to have frequent password change policy
- Nowadays it is not needed to force user if there is no any requirement

#### Password Hashing
- Store passwords securely by using cryptographic hashing algorithms
- Use salted passwords, where a random value (the salt) is added to each password before hashing
- Prevents precomputed tables

#### Avoid Security Questions
- Avoid using easily guessable security questions or answers
- Some security questions may have answers that can be found or guessed through social media or public records

#### Monitoring and Alerts
- Implement monitoring mechanisms to detect suspicious login attempts
- Set up alerts to notify users of potential security breaches

#### Education and Awareness
- Educate users about the importance of password security and the risks of weak or compromised passwords
- Offer guidance on creating strong passwords and protecting their accounts

### Password Hashing Implementation

The `java.security` package provides necessary classes to generate a secure password:

```java
String password = "test";
MessageDigest md = MessageDigest.getInstance("MD5");
md.update(password.getBytes());
byte[] digest = md.digest();
StringBuffer sb = new StringBuffer();
for (int i = 0; i < digest.length; i++)
    sb.append(Integer.toString((digest[i] & 0xff) + 0x100, 16).substring(1));
JOptionPane.showMessageDialog(rootPane, sb.toString());
```

---

## File Upload Vulnerabilities

### Overview
- File uploads are essential for many web applications to function properly (e.g., uploading images, documents, or media files)
- However, this functionality can also be exploited by attackers if not properly implemented and validated

### Types of Vulnerabilities
- Malicious File Execution
- Directory Traversal
- Overwriting System Files
- DoS
- File Content Manipulation

### Best Practices for Prevention

#### File Type Validation
- Limit the allowed file types to specific formats required by the application

#### File Size Limitation
- Restrict the maximum file size allowed for upload

#### Secure File Storage
- Store uploaded files outside of the webroot or in a secure location

#### Rename Files
- Change the name of uploaded files to avoid overwriting system files

#### Regular Updates and Patching
- Keep the web application and related libraries up to date to address any potential file upload vulnerabilities

---

# Part II: Quality Management

## Testing

### Definition
- Testing is a way to increase your confidence that your program meets its requirements
- Making sure the program does what it's supposed to do
- Making sure that you know what it's supposed to do!
- Testing ensures that your software solution meets the requirements

### Types of Testing

#### Unit Testing
- **Question**: Do the parts perform correctly alone?
- Tests as small a piece of functionality (the unit)
- Here we'll test one thing at a time
- This is developer's job
- One function may have multiple unit tests according to the usage and outputs of the function

#### Integration Testing
- **Question**: Do the parts perform correctly together?
- Tests how different components work together

#### User Acceptance Testing
- **Question**: Does the system meet the end user's expectations?
- Tests from the user's perspective

---

## Unit Testing

### Definition
- A unit test is written by a developer that tests as small a piece of functionality (the unit)
- Here we'll test one thing at a time
- This is developer's job
- One function may have multiple unit tests according to the usage and outputs of the function

### Characteristics of a Good Unit Test

A good unit test is:
- **Isolated/independent**: Each test should be independent
- **Repeatable**: Should produce consistent results
- **Fast**: Should execute quickly
- **Self-documenting**: Should clearly describe what is being tested

---

## 3A's in Unit Testing

### Arrange
- You're arranging things prior to calling the method/function of interest
- Setting up test data and objects

### Act
- Action stage, calling a method or function
- Executing the code being tested

### Assert
- The part that ensures that your expectations are met
- Verifying that the results are as expected

---

## JUnit: Framework for Unit Testing

### Overview
- **Unit testing framework for the Java programming language**
- Important in the development of test-driven development

### Benefits of Framework Support
- It's standard, everybody writes their tests the same way, so everybody knows:
  - Where to find tests
  - How to run tests
  - How to interpret results
  - How to add/modify tests
- Testing is easily automated and also integrates with many IDEs

---

# Part III: How to Become a Good Developer?

## Top 10 Coding Practices for Secure Development

### 1. Input Validation and Sanitization
- Always validate and sanitize user input to prevent security vulnerabilities like SQL injection, XSS, and other injection attacks

### 2. Secure Password Storage
- Store user passwords securely using strong cryptographic hashing algorithms with unique salts

### 3. Parameterized Queries and Prepared Statements
- Use parameterized queries and prepared statements when interacting with databases to prevent SQL injection attacks

### 4. Secure Session Management
- Use secure session management techniques, such as:
  - Unique session IDs
  - Proper session timeouts
  - Secure cookie attributes
- Prevent session-related attacks like session hijacking

### 5. XSS Prevention
- Properly escape output data to prevent XSS attacks

### 6. CSRF Protection
- Implement CSRF tokens to validate the origin of requests and prevent CSRF attacks
- Require additional authentication for critical actions to prevent unauthorized requests

### 7. Regular Security Testing and Code Reviews
- Conduct regular security assessments, penetration testing, and code reviews to identify and fix security weaknesses

### 8. Error Handling and Logging
- Implement proper error handling to prevent the disclosure of sensitive information in error messages
- Log security events and exceptions to monitor and respond to potential security incidents

### 9. Keep Software and Libraries Up-to-date
- Regularly update the application and its dependencies with the latest security patches and bug fixes
- Keep track of known vulnerabilities in libraries and packages and update them promptly

### 10. Security Awareness and Education
- Stay updated with the latest security trends and best practices
- Participate in security training and awareness programs
- Share security knowledge with team members

---

## Summary

Developing secure and high-quality applications requires:
- **Security consciousness** from the start, not as an afterthought
- **Proper testing practices** including unit testing to catch bugs early
- **Following secure coding principles** in every aspect of development
- **Continuous learning** and staying updated with security best practices
- **Collaboration** with security teams and code reviewers to ensure quality

The combination of security awareness, rigorous testing, and adherence to coding best practices will help developers create robust, secure, and maintainable applications even under rapid development timelines.
