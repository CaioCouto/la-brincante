const { default: axios } = require("axios")

describe('Test Courses Routes', () => {
    let courseId;
    const courseName = 'dumbtest';

    it('Register Course /courses/register', (done) => {
        const courseValue = 100;

        axios.post(
            'http://localhost:3333/courses/register',
            { 
                name: courseName,
                value: courseValue 
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(resp => {
            courseId = resp.data.id;
            expect(resp.status).toBe(200);
            expect(resp.data.name).toBe(courseName);
            done();
        });
    });
    
    it('Course already exists /courses/register', (done) => {
        axios.post(
            'http://localhost:3333/courses/register',
            { name: courseName },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .catch(({ response }) => {
            expect(response.status).toBe(400);
            expect(response.data.message).toBe('Este curso já existe.');
            done();
        });
    });
    
    it('List Course /courses', (done) => {
        axios.get('http://localhost:3333/courses')
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.data).toBeInstanceOf(Array);
            expect(resp.data.length).toBeGreaterThan(0);
            done();
        });
    });
    
    it('Update Course /courses/update', (done) => {
        const newCourseName = 'updated test course 01';
        const newCourseValue = 200;

        axios.patch(
            `http://localhost:3333/courses/update/${courseId}`,
            { 
                name: newCourseName,
                value: newCourseValue
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.data.name).toBe(newCourseName);
            expect(resp.data.value).toBe(newCourseValue);
            done();
        })
        .catch((error) => {
            console.log(error)
            done();
        });
    });

    it('Delete Course /courses/delete/:id', (done) => {
        axios.delete(`http://localhost:3333/courses/delete/${courseId}`)
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.data.id).toBe(courseId);
            done();
        });
    });
}) 