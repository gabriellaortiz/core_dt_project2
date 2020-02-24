var others="<input type='text' />";
var file="<input type='file' />";
    (function() {
        var questions = [{
            question: "Design a mockup for a new residential building located in a growing city in need of more housing. The main demographic is students and couples.",
            choices:[file],
        }, {
            question: "You’re at the beginning of a project, working with a client: University of Michigan. They want you to design their new science building. What questions do you ask them to get started?",
            choices: [others],
        }, {
            question: "Why is an additive alternate to a bid preferable to a deductive alternate to a bid?",
            choices: [others],
        },{
            question: "What are the advantages and disadvantages of pursuing a design/bid/build method of project delivery?",
            choices: [others],
        },{
            question: "You are in the middle of designing a project for a new building in midtown Manhattan. You realize that a team member messed up the measurements, therefore setting back the timeline for completion. How do you approach the situation?",
            choices: [others],
        },{
            question: "Provide a sketch, a three dimensional drawing, and a prototype for a hospital building.",
            choices: [file, file, file],
        },{
            question: "You’re leading a team in which there is a disagreement between two of your colleagues. How do you resolve the issue?",
            choices: [others],
        },{
            question: "How would you approach designing for a family owned house vs. an office space?",
            choices: [others],
        },{
            question: "List some inspirations for your work and explain why.",
            choices: [others],
        }, {
            question: "A foundation is being built in clay soil. If the area of a correctly designed footing has an area of 12 square feet and the applied load is 24,000 lbs, then what is the bearing capacity of this soil?",
            choices: [others],
        }]
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object

    // Display initial question
    displayNext();

    // Click handler for the 'next' button
    $('#next').on('click', function(e) {
        e.preventDefault();

        // Suspend click listener during fade animation
        if (quiz.is(':animated')) {
            return false;
        }
        choose();

        // If no user selection, progress is stopped
        // if (isNaN(selections[questionCounter])) {
        //     alert('Please make a selection!');
        // } else {
        //     questionCounter++;
        //     displayNext();
        // }

            questionCounter++;
            console.log(questionCounter);
            displayNext();
    
    });

    // Click handler for the 'prev' button
    $('#prev').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    // Click handler for the 'Start Over' button
    $('#start').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    // Animates buttons on hover
    $('.button').on('mouseenter', function() {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function() {
        $(this).removeClass('active');
    });

    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        if (questionCounter == 0 || questionCounter == 5) {
            var fileUpload = addFile(name);
            qElement.append(fileUpload);
        } else {
            var shortAnswer = addBox(name);
            qElement.append(shortAnswer); 
        }
       return qElement;
     
    }

    // ORIGINAL Creates a list of the answer choices as radio inputs
    // function createRadios(index) {
    //     var radioList = $('<ul>');
    //     var item;
    //     var input = '';
    //     for (var i = 0; i < questions[index].choices.length; i++) {
    //         item = $('<li>');
    //         input = '<input type="radio" name="answer" value=' + i + ' />';
    //         input += questions[index].choices[i];
    //         item.append(input);
    //         radioList.append(item);
    //     }
    //     return radioList;
    // }


    // Creates a list of the answer choices as radio inputs
    // function createRadios(index) {
    //     var radioList = $('<p>');
    //     var item;
    //     var input = '';
    //     for (var i = 0; i < questions[index].choices.length; i++) {
    //         item = $('<p>');
    //         input = '<input type="text" name="answer" value=' + i + ' />';
    //         input += questions[index].choices[i];
    //         item.append(input);
    //         radioList.append(item);
    //     }
    //     return radioList;
    // }

    function addBox(name) {
        var enterAnswer = document.createElement('div');
        var textHtml = '<textarea id="useranswer" name="' + name + '"';    
        textHtml += 'textarea/>';
        enterAnswer.innerHTML = textHtml;        
        return enterAnswer;
}

    function addFile(name) {
        var enterAnswer = document.createElement('div');
        var textHtml = '<input id="fileupload" type="file" name="' + name + '"';    
        textHtml += '/>';
        enterAnswer.innerHTML = textHtml;        
        return enterAnswer;
}

    // Reads the user selection and pushes the value to an array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // Displays next requested element
    function displayNext() {
        quiz.fadeOut(function() {
            $('#question').remove();

            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }

                // Controls display of 'prev' button
                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                window.location.href = "results.html";
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }
})();