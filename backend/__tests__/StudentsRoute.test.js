const { default: axios } = require("axios")

describe('Test Students Routes', () => {
    let studentId;

    it('Register Student /students/register', (done) => {
        const student = {
            name: 'Test Student',
        };

        axios.post(
            'http://localhost:3333/students/register',
            {
                name: student.name,
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(resp => {
            studentId = resp.data.id;
            expect(resp.status).toBe(200);
            expect(resp.data.name).toBe(student.name);
            done();
        });
    });
    
    it('Update Student /students/update', (done) => {
        const student = {
            name: 'Updated Test Student'
        };

        axios.patch(
            `http://localhost:3333/students/update/${studentId}`,
            {
                name: student.name,
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(resp => {
            studentId = resp.data.id;
            expect(resp.status).toBe(200);
            expect(resp.data.name).toBe(student.name);
            done();
        });
    });

    it('List Students /students', (done) => {
        axios.get('http://localhost:3333/students')
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.data).toBeInstanceOf(Array);
            expect(resp.data.length).toBeGreaterThan(0);
            done();
        });
    });
    
    it('List Students by id /students/:id', (done) => {
        axios.get(`http://localhost:3333/students/${studentId}`)
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.data.id).toBe(studentId);
            done();
        });
    });
    
    it('Delete Student /students/delete/:id', (done) => {
        axios.delete(`http://localhost:3333/students/delete/${studentId}`)
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.data.id).toBe(studentId);
            done();
        });
    });
});