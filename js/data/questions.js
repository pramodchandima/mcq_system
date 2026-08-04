export const questions = [
    {
        id: "q1",
        questionText: "What is the primary cause of SQL Injection vulnerabilities in web applications?",
        options: [
            "Executing database commands via parameterized database queries.",
            "Concatenating user-supplied input directly into dynamic SQL queries.",
            "Granting root or excessive privileges to standard database users.",
            "Performing input validation on both the client side and server side."
        ],
        correctAnswerIndex: 1,
        explanation: "SQL Injection flaws occur when software developers create dynamic database queries by concatenating user-supplied input directly into the query, allowing attackers to manipulate the SQL logic."
    },
    {
        id: "q2",
        questionText: "Examine the following Java code snippet:\n\nString query = \"SELECT * FROM login WHERE username= ? AND password= ? \";\nPreparedStatement pstmt = con.prepareStatement(query);\npstmt.setString(1, username);\npstmt.setString(2, password);\n\nHow does this code prevent SQL Injection?",
        options: [
            "By encrypting database connection credentials during data transmission.",
            "By precompiling the SQL statement and passing values as parameters.",
            "By validating input string lengths and checking data types automatically.",
            "By hashing the SQL query string prior to sending it to the database."
        ],
        correctAnswerIndex: 1,
        explanation: "Prepared statements represent precompiled SQL statements. Passing values as parameters ensures the database engine treats parameters strictly as data values, preventing them from altering the query logic."
    },
    {
        id: "q3",
        questionText: "Which of the following describes the mechanism of a Session Hijacking attack?",
        options: [
            "Inserting malicious SQL queries into the database to access backend tables.",
            "Stealing or predicting a valid Session ID token to impersonate a legitimate user.",
            "Flooding the target web server with high volumes of malicious network traffic.",
            "Modifying parameter values in a form submission request to alter account details."
        ],
        correctAnswerIndex: 1,
        explanation: "Session Hijacking is the exploitation of the web session control mechanism. The attacker steals or predicts a valid session token (Session ID) to impersonate an authorized user."
    },
    {
        id: "q4",
        questionText: "In Java Web Applications, which method is used to securely terminate and destroy an active user session?",
        options: [
            "session.close();",
            "session.destroy();",
            "session.invalidate();",
            "session.clear();"
        ],
        correctAnswerIndex: 2,
        explanation: "The session.invalidate() method is used to invalidate/terminate the session and unbind any objects bound to it, rendering the session token useless."
    },
    {
        id: "q5",
        questionText: "To prevent session timeouts from being infinite, which Java code snippet sets the session timeout limit to 10 minutes (600 seconds)?",
        options: [
            "session.setTimeout(600);",
            "session.setMaxInactiveInterval(600);",
            "session.setExpiryTime(600);",
            "session.setSessionTimeout(600);"
        ],
        correctAnswerIndex: 1,
        explanation: "The session.setMaxInactiveInterval(int interval) method sets the maximum inactive interval in seconds. 10 minutes = 600 seconds."
    },
    {
        id: "q6",
        questionText: "Which of the following is NOT considered a top Parameter Tampering threat?",
        options: [
            "Manipulating parameter values in the URL query string.",
            "Modifying hidden variable fields in a web page form.",
            "Altering internal database index structures directly.",
            "Tampering with parameter values in HTTP request headers."
        ],
        correctAnswerIndex: 2,
        explanation: "The main parameter tampering threats involve modifications to query strings, form fields, cookies, and HTTP headers. Database indexes are managed directly within the database and are not part of client-server parameters."
    },
    {
        id: "q7",
        questionText: "What is the most effective way to prevent unauthorized access caused by URL query string manipulation?",
        options: [
            "Depending entirely on JavaScript client-side validations.",
            "Applying cryptographic hashing functions to all query parameters.",
            "Implementing robust role-based authorization checks on the server.",
            "Hiding the URL address bar completely in the user's web browser."
        ],
        correctAnswerIndex: 2,
        explanation: "Access Control checks ensure the authenticated user is actually authorized to view the requested object or service, preventing them from viewing other users' data by changing URL variables."
    },
    {
        id: "q8",
        questionText: "How does Cross-Site Scripting (XSS) typically occur in web applications?",
        options: [
            "Incorporating raw user input directly into web responses without escaping.",
            "Failing to implement primary keys and indexes inside backend database tables.",
            "Neglecting to configure network firewalls for incoming server traffic.",
            "Leaving user sessions active indefinitely without setting a session timeout."
        ],
        correctAnswerIndex: 0,
        explanation: "XSS vulnerabilities happen when a web application takes untrusted data and sends it to a web browser without proper validation or output encoding/escaping, allowing malicious scripts to execute in the user's browser."
    },
    {
        id: "q9",
        questionText: "Which security threat involves an attacker trying all possible combinations of usernames and passwords until finding the correct credentials?",
        options: [
            "Overwhelming a target network with traffic to make a service unavailable.",
            "Tricking a user's browser into performing unwanted actions on another site.",
            "Testing all possible username and password combinations to gain access.",
            "Altering URL query parameters to view unauthorized database records."
        ],
        correctAnswerIndex: 2,
        explanation: "A Brute Force Attack relies on trying all possible username and password combinations. While resource-intensive, they are successful if passwords are weak."
    },
    {
        id: "q10",
        questionText: "Which of the following is a prevention method against Brute Force attacks?",
        options: [
            "Encoding all HTML output characters sent to the user's web browser.",
            "Implementing account lockouts and restricting incoming request rates.",
            "Using precompiled prepared statements for login verification queries.",
            "Granting root privileges strictly to authorized standard database users."
        ],
        correctAnswerIndex: 1,
        explanation: "Account lockouts (temporarily blocking an account after consecutive failed attempts) and rate limiting (restricting request frequencies) are critical mechanisms to block brute force attempts."
    },
    {
        id: "q11",
        questionText: "In a Cross-Site Request Forgery (CSRF) attack, what is the attacker's main objective?",
        options: [
            "Injecting dynamic SQL commands to bypass user authentication completely.",
            "Flooding a target server with distributed traffic to exhaust its resources.",
            "Tricking a user's browser into making unwanted requests to an authenticated site.",
            "Sniffing local network traffic to capture plaintext session authentication tokens."
        ],
        correctAnswerIndex: 2,
        explanation: "CSRF exploits the trust a site has in a user's browser. It tricks the victim's browser into executing commands/requests on a web application where the victim is already authenticated."
    },
    {
        id: "q12",
        questionText: "Which attribute can be added to cookies to prevent them from being sent in cross-site requests, helping defend against CSRF?",
        options: [
            "SameSite",
            "Secure",
            "HttpOnly",
            "Domain"
        ],
        correctAnswerIndex: 0,
        explanation: "The SameSite attribute controls whether cookies are sent with cross-site requests, providing robust protection against CSRF attacks."
    },
    {
        id: "q13",
        questionText: "What is the primary difference between a DoS and a DDoS attack?",
        options: [
            "DoS attacks target application source code, while DDoS attacks target web servers.",
            "DoS attacks originate from a single source, while DDoS attacks use multiple sources.",
            "DoS relies entirely on database injection, while DDoS relies on script injection.",
            "DoS attacks target user web browsers, while DDoS attacks target server firewalls."
        ],
        correctAnswerIndex: 1,
        explanation: "DoS (Denial of Service) attacks originate from a single source. DDoS (Distributed Denial of Service) attacks use multiple compromised systems (botnets) to flood resources from many places."
    },
    {
        id: "q14",
        questionText: "Why must server-side validation be performed even if client-side validation is already implemented?",
        options: [
            "Server-side validation executes much faster and is easier to implement.",
            "Client-side validation can be easily bypassed by disabling browser JavaScript.",
            "Server-side validation can check visual UI layout properties effectively.",
            "Browsers completely lack built-in support for client-side validation libraries."
        ],
        correctAnswerIndex: 1,
        explanation: "Client-side validation improves user experience, but it is entirely insecure since the client-side code is under the user's control. Attackers can bypass it easily, making server-side validation mandatory."
    },
    {
        id: "q15",
        questionText: "Which of the following is a SECURE error message to return to a user after a failed login?",
        options: [
            "The password you entered for this account is incorrect.",
            "The requested username does not exist in our database.",
            "Invalid username or password. Please try logging in again.",
            "Database connection failed during the login query execution."
        ],
        correctAnswerIndex: 2,
        explanation: "'Invalid username or password' is secure because it doesn't reveal whether the username exists or not, preventing attackers from harvesting usernames."
    },
    {
        id: "q16",
        questionText: "What is the purpose of password 'salting' in cryptography?",
        options: [
            "Encrypting user passwords securely using a symmetric cryptographic key.",
            "Adding a random value before hashing to prevent rainbow table attacks.",
            "Ensuring user passwords contain a mix of uppercase and special characters.",
            "Converting plaintext user passwords into dynamic database query strings."
        ],
        correctAnswerIndex: 1,
        explanation: "Salting adds a unique, random string (salt) to a password before hashing. Even if two users have the same password, their hashes will look different, blocking precomputed table attacks."
    },
    {
        id: "q17",
        questionText: "Which testing type answers the question: 'Do the parts perform correctly alone?'",
        options: [
            "Integration Testing",
            "User Acceptance Testing",
            "Unit Testing",
            "System Testing"
        ],
        correctAnswerIndex: 2,
        explanation: "Unit testing focuses on testing as small a piece of functionality (the unit, like a single method) in isolation to ensure it functions correctly on its own."
    },
    {
        id: "q18",
        questionText: "What is the correct order and meaning of the '3A's' in Unit Testing?",
        options: [
            "Arrange (set up data), Act (execute code), Assert (verify expectations).",
            "Analyze (check requirements), Arrange (write tests), Act (run tests).",
            "Act (run application), Assert (check output), Archive (store test results).",
            "Authenticate (verify user), Authorize (permissions), Audit (log results)."
        ],
        correctAnswerIndex: 0,
        explanation: "The 3A's stand for Arrange (preparing test data and objects), Act (calling the method under test), and Assert (verifying the output matches expectations)."
    },
    {
        id: "q19",
        questionText: "Which of the following is a characteristic of a GOOD Unit Test?",
        options: [
            "Tied closely to global database state and shared test execution fixtures.",
            "Slow and highly comprehensive to cover multiple source files simultaneously.",
            "Isolated completely from other tests, easily repeatable, and fast to execute.",
            "Dependent entirely on external web APIs and active network connection states."
        ],
        correctAnswerIndex: 2,
        explanation: "Good unit tests must be isolated/independent, repeatable (consistent results), fast, and self-documenting."
    },
    {
        id: "q20",
        questionText: "In secure development, which of the following is considered a best practice?",
        options: [
            "Postponing security considerations until the final application testing phase.",
            "Relying exclusively on client-side browser controls for data security.",
            "Consciously integrating security principles from the start of development.",
            "Storing plaintext user passwords securely inside client-side session cookies."
        ],
        correctAnswerIndex: 2,
        explanation: "Developing secure and high-quality applications requires security consciousness from the start of the software development lifecycle, rather than trying to patch it in later."
    }
];
