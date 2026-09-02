export const questions_wad_2024 = [
    {
        id: 'wad-2024-q1',
        questionText: 'In PHP, how do you access a value stored in a query string parameter called "name"?',
        options: [
            '$_REQUEST["name"]',
            '$_SESSION["name"]',
            '$_COOKIE["name"]',
            '$_GET["name"]',
            '$_POST["name"]'
        ],
        correctAnswerIndex: 3,
        explanation: 'Query string parameters (data appended to the URL after ?) are read using the $_GET superglobal.'
    },
    {
        id: 'wad-2024-q2',
        questionText: 'In the context of web development, what is the purpose of session management using PHP?',
        options: [
            'To prevent data retrieval',
            'To create user profiles',
            'To eliminate user preferences',
            'To track users across multiple web pages',
            'To increase website aesthetics'
        ],
        correctAnswerIndex: 3,
        explanation: 'HTTP is stateless; sessions preserve user state/data across multiple pages.'
    },
    {
        id: 'wad-2024-q3',
        questionText: 'Consider the following statements regarding variable naming in PHP:\n1. (i) Variable names are case-insensitive.\n2. (ii) Variable names can contain only letters and numbers.\n3. (iii) Variable names always begin with $, on both declaration and usage.\n\nWhich of the above statements is/are correct?',
        options: [
            '(i), (ii) and (iii)',
            '(i) only',
            '(i) and (iii) only',
            '(ii) and (iii) only',
            '(iii) only'
        ],
        correctAnswerIndex: 4,
        explanation: 'PHP variable names are case-sensitive, and they may also contain underscores (_) — must start with a letter or underscore. Only statement (iii) is true.'
    },
    {
        id: 'wad-2024-q4',
        questionText: "The variable $country has the value 'Sri Lanka'. What is the PHP code line to output the position of the letter 'n' and what will be the output?",
        options: [
            "strloc($country, 'n'); output = 7",
            "strpos($country, 'n'); output = 7",
            "strloc($country, 'n'); output = 6",
            "strpos($country, 'n'); output = 6",
            "substr('n', $country); output = 6"
        ],
        correctAnswerIndex: 3,
        explanation: "strpos() returns a zero-based index. S(0) r(1) i(2) space(3) L(4) a(5) n(6) → 6. (strloc() does not exist.)"
    },
    {
        id: 'wad-2024-q5',
        questionText: 'Which of the following is a key principle of RESTful APIs that simplifies communication between applications?',
        options: [
            'Server-based communication',
            'Stateless communication',
            'Closed communication',
            'Monolithic communication',
            'Synchronous communication'
        ],
        correctAnswerIndex: 1,
        explanation: 'REST is stateless — each request contains all information needed to process it.'
    },
    {
        id: 'wad-2024-q6',
        questionText: 'Which PHP function is NOT used to sanitize user inputs?',
        options: [
            'strip_tags()',
            'htmlentities()',
            'explode()',
            'stripslashes()',
            'htmlspecialchars()'
        ],
        correctAnswerIndex: 2,
        explanation: 'explode() splits a string into an array — it has no sanitization purpose.'
    },
    {
        id: 'wad-2024-q7',
        questionText: 'Which way is correct to represent the name of the current script file being executed in a Form action?',
        options: [
            'action="<?php echo $_SERVER[\'PHP_SESSION\']; ?>"',
            'action="$_SERVER[\'PHP_SELF\']"',
            'action="<?php echo $_SERVER[\'REQUEST_METHOD\']; ?>"',
            'action="<?php echo $_SERVER[\'PHP_SELF\']; ?>"',
            'action="<?php echo $_POST[\'PHP_SELF\']; ?>"'
        ],
        correctAnswerIndex: 3,
        explanation: '$_SERVER[\'PHP_SELF\'] holds the filename of the currently executing script and must be echoed inside PHP tags.'
    },
    {
        id: 'wad-2024-q8',
        questionText: 'What is server-side scripting?',
        options: [
            'A type of programming executed on the server-side',
            'A type of programming executed on mobile devices',
            'A type of programming executed in the user\'s browser',
            'A type of programming executed in databases',
            'A type of programming executed in cloud services'
        ],
        correctAnswerIndex: 0,
        explanation: 'Server-side scripting refers to scripts executed on the web server before the response is delivered to the client browser.'
    },
    {
        id: 'wad-2024-q9',
        questionText: 'What is the correct PHP function to move a submitted file to a permanent location in PHP form handling?',
        options: [
            'send_updoaded_file($tempLocation, $permanentLocation);',
            'move_updoaded_file($permanentLocation, $tempLocation);',
            'move_uploaded_file($tempLocation, $permanentLocation);',
            'move_updoad_file($tempLocation, $permanentLocation);',
            'move_updoad_file($permanentLocation, $tempLocation);'
        ],
        correctAnswerIndex: 2,
        explanation: 'Syntax: move_uploaded_file(string $from, string $to) — source (temp location) first, destination second.'
    },
    {
        id: 'wad-2024-q10',
        questionText: 'What is the most correct PHP statement to redirect to the \'next.php\' page?',
        options: [
            'redirect("Location: next.php");',
            'redirect("Location: next.php"); exit();',
            'redirect("next.php");',
            'header("Location: next.php"); exit();',
            'header("Location: next.php");'
        ],
        correctAnswerIndex: 3,
        explanation: 'header() sends the redirect HTTP response header; exit() immediately stops script execution (best practice).'
    },
    {
        id: 'wad-2024-q11',
        questionText: 'What will be the output of the below code?\n\n<?php\n$name = "John";\n$age = 25;\necho \'My name is $name and I am $age years old.\';\n?>',
        options: [
            'My name is John and I am $age years old.',
            'My name is $name and I am 25 years old.',
            'My name is John and I am 25 years old.',
            'My name is $name and I am $age years old.',
            'Error'
        ],
        correctAnswerIndex: 3,
        explanation: 'Single-quoted strings in PHP do NOT evaluate or interpolate variables.'
    },
    {
        id: 'wad-2024-q12',
        questionText: 'What will be the output of the following PHP code?\n\n<?php\n$num = array(1,4,6,3,8);\nforeach ($num as $n){\n    if($n%3==0){\n        continue;\n    }else{\n        echo $n.", ";\n    }\n}\n?>',
        options: [
            '1, 4, 6,',
            '1, 4, 8,',
            '1, 4,',
            '1, 4, 6, 8,',
            'Error'
        ],
        correctAnswerIndex: 1,
        explanation: 'Multiples of 3 (6 and 3) trigger continue and are skipped, outputting: 1, 4, 8,'
    },
    {
        id: 'wad-2024-q13',
        questionText: 'In PDO, which method is used to bind a parameter to a placeholder in a prepared SQL statement?',
        options: [
            'query()',
            'connect()',
            'bindParam()',
            'fetch()',
            'execute()'
        ],
        correctAnswerIndex: 2,
        explanation: 'bindParam() binds a PHP variable to a parameter marker in a prepared SQL statement.'
    },
    {
        id: 'wad-2024-q14',
        questionText: 'How does polymorphism promote flexibility in PHP code?',
        options: [
            'It allows code to work with objects of different classes interchangeably',
            'It prevents the creation of objects from classes',
            'It makes code rigid and inflexible',
            'It increases code complexity',
            'It enforces strict naming conventions'
        ],
        correctAnswerIndex: 0,
        explanation: 'Polymorphism allows objects of different classes implementing common interfaces/base classes to be treated interchangeably.'
    },
    {
        id: 'wad-2024-q15',
        questionText: 'What is the usage of the enctype attribute in PHP form handling?',
        options: [
            'To specify how the form data should be recorded and sent to the server when submitting the form',
            'To specify how the form data should be validated and sent to the server when submitting the form',
            'To specify how the form data should be redirected and sent to the server when submitting the form',
            'To specify how the form data should be encoded and sent to the server when submitting the form',
            'To specify how the form data should be sanitized and sent to the server when submitting the form'
        ],
        correctAnswerIndex: 3,
        explanation: 'enctype specifies how form data is encoded before sending to server (e.g. enctype="multipart/form-data" for file uploads).'
    }
];

export const questions_wad_iit_2023 = questions_wad_2024.map(q => ({
    ...q,
    id: q.id.replace('wad-2024', 'wad-iit-2023')
}));

