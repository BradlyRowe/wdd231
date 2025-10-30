// Course data and filtering functionality

// Course data array
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true // Marking as completed - update based on your actual completion
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true // Marking as completed - update based on your actual completion
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false // Currently taking this course
    }
];

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    const courseContainer = document.getElementById('course-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const totalCreditsElement = document.getElementById('total-credits');

    // Function to create a course card HTML
    function createCourseCard(course) {
        const completedClass = course.completed ? 'completed' : '';

        return `
            <div class="course-card ${completedClass}">
                <div class="course-content">
                    <div class="course-code">${course.subject} ${course.number}</div>
                    <h3 class="course-title">${course.title}</h3>
                </div>
            </div>
        `;
    }

    // Function to display courses
    function displayCourses(coursesToShow) {
        if (!courseContainer) return;

        courseContainer.innerHTML = coursesToShow.map(course => createCourseCard(course)).join('');
        
        // Add animation delay for each card
        const courseCards = courseContainer.querySelectorAll('.course-card');
        courseCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Function to calculate and display total credits
    function updateTotalCredits(coursesToShow) {
        if (!totalCreditsElement) return;

        const totalCredits = coursesToShow.reduce((total, course) => total + course.credits, 0);
        totalCreditsElement.textContent = totalCredits;
    }

    // Function to filter courses
    function filterCourses(filterType) {
        let filteredCourses;

        switch (filterType) {
            case 'CSE':
                filteredCourses = courses.filter(course => course.subject === 'CSE');
                break;
            case 'WDD':
                filteredCourses = courses.filter(course => course.subject === 'WDD');
                break;
            case 'all':
            default:
                filteredCourses = courses;
                break;
        }

        displayCourses(filteredCourses);
        updateTotalCredits(filteredCourses);
    }

    // Add event listeners to filter buttons
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter type and filter courses
                const filterType = this.dataset.filter;
                filterCourses(filterType);
                
                // Announce change to screen readers
                const coursesShown = filterType === 'all' ? 'all courses' : `${filterType} courses`;
                announceToScreenReader(`Now showing ${coursesShown}`);
            });
        });
    }

    // Function to announce changes to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Initialize the page with all courses
    filterCourses('all');

    // Add keyboard navigation for filter buttons
    filterButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(event) {
            let targetIndex;
            
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    targetIndex = index > 0 ? index - 1 : filterButtons.length - 1;
                    filterButtons[targetIndex].focus();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    targetIndex = index < filterButtons.length - 1 ? index + 1 : 0;
                    filterButtons[targetIndex].focus();
                    break;
                case 'Home':
                    event.preventDefault();
                    filterButtons[0].focus();
                    break;
                case 'End':
                    event.preventDefault();
                    filterButtons[filterButtons.length - 1].focus();
                    break;
            }
        });
    });

    // Export for potential use in other scripts
    window.courseData = {
        courses,
        filterCourses,
        displayCourses,
        updateTotalCredits
    };
});