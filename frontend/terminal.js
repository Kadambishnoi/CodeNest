let editor = document.querySelector("#editor");

ace.edit(editor, {
  theme: "ace/theme/one_dark",
  mode: "ace/mode/java",
});

const apiUrl = 'http://localhost:8080/api/code/';
        
        // Function to execute the code and fetch output
        function executeCode() {
            const editor = ace.edit("editor");
            const code = editor.getSession().getValue().trim();
            const language = document.getElementById('language').value;
            const input = document.getElementById('userInput').value;
            
            fetch(apiUrl + 'execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `language=${encodeURIComponent(language)}&code=${encodeURIComponent(code)}&input=${encodeURIComponent(input)}`
            })
            .then(response => response.text()) // Parse response as text
            .then(id => {
                document.getElementById('output').innerText = `Code is running...`;
                document.getElementById('output').setAttribute('data-execution-id', id); // Store execution ID
            })
            .catch(error => {
                console.error('Error executing code:', error);
                document.getElementById('output').innerText = 'Error executing code.';
            });
        }
        
        
        // Function to fetch output from the database
        function fetchOutput() {
            const executionId = document.getElementById('output').getAttribute('data-execution-id');
            if (!executionId) {
                console.error('No execution ID available.');
                document.getElementById('output').innerText = 'No execution ID available.';
                return;
            }
            
            fetch(apiUrl + 'output?id=' + encodeURIComponent(executionId))
            .then(response => response.text()) // Parse response as text
            .then(output => {
                document.getElementById('output').innerText = output;
            })
            .catch(error => {
                console.error('Error fetching output:', error);
                document.getElementById('output').innerText = 'Error fetching output.';
            });
           
        }

        function Run() {
            executeCode(); 
            setTimeout(fetchOutput, 2000); 
          }