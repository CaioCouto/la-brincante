const { default: axios } = require("axios")

describe('Test Enrollments Routes', () => {
    let enrollmentId;

    it('Register Enrollments /enrollments/register', (done) => {
        const enrollment = {
            studentId: 1,
            courseId: 1,
            classDays: [0,1],
            classTime: '11:00',
            duration: 60,
            discount: 0,
            isOnline: false,
            billingDay: '13'
        };

        axios.post(
            'http://localhost:3333/enrollments/register',
            {
                studentId: enrollment.studentId,
                courseId: enrollment.courseId,
                classDays: enrollment.classDays,
                classTime: enrollment.classTime,
                duration: enrollment.duration,
                discount: enrollment.discount,
                isOnline: enrollment.isOnline,
                billingDay: enrollment.billingDay
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(resp => {
            enrollmentId = resp.data.id;
            expect(resp.status).toBe(200);
            expect(resp.data.studentId).toBe(enrollment.studentId);
            expect(resp.data.courseId).toBe(enrollment.courseId);
            expect(resp.data.classDays).toBe(enrollment.classDays.join(','));
            expect(resp.data.classTime).toBe(enrollment.classTime);
            expect(resp.data.duration).toBe(enrollment.duration);
            expect(resp.data.discount).toBe(enrollment.discount);
            expect(resp.data.isOnline).toBe(enrollment.isOnline);
            expect(resp.data.billingDay).toBe(enrollment.billingDay);
            done();
        });
    });
    
    it('Register duplicated enrollments /enrollments/register', (done) => {
        const enrollment = {
            studentId: 1,
            courseId: 1,
            classDays: [0,1],
            classTime: '11:00',
            duration: 60,
            discount: 0,
            isOnline: false,
            billingDay: '13'
        };

        axios.post(
            'http://localhost:3333/enrollments/register',
            {
                studentId: enrollment.studentId,
                courseId: enrollment.courseId,
                classDays: enrollment.classDays,
                classTime: enrollment.classTime,
                duration: enrollment.duration,
                discount: enrollment.discount,
                isOnline: enrollment.isOnline,
                billingDay: enrollment.billingDay
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .catch(error => {
            expect(error.response.status).toBe(400);
            done();
        });
    });

    it('Update Enrollment /enrollments/update/:id', (done) => {
        const updatedEnrollment = {
            classDays: [2,3],
            classTime: '15:00',
            duration: 120,
            discount: 50,
            isOnline: true,
            billingDay: '15'
        };

        axios.patch(
            `http://localhost:3333/enrollments/update/${enrollmentId}`,
            {
                classDays: updatedEnrollment.classDays,
                classTime: updatedEnrollment.classTime,
                duration: updatedEnrollment.duration,
                discount: updatedEnrollment.discount,
                isOnline: updatedEnrollment.isOnline,
                billingDay: updatedEnrollment.billingDay
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.data.classDays).toBe(updatedEnrollment.classDays.join(','));
            expect(resp.data.classTime).toBe(updatedEnrollment.classTime);
            expect(resp.data.duration).toBe(updatedEnrollment.duration);
            expect(resp.data.discount).toBe(updatedEnrollment.discount);
            expect(resp.data.isOnline).toBe(updatedEnrollment.isOnline);
            expect(resp.data.billingDay).toBe(updatedEnrollment.billingDay);
            done();
        });
    });
    
    it('List All Enrollments /enrollments', (done) => {
        axios.get(`http://localhost:3333/enrollments`)
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.data).toBeInstanceOf(Array);
            expect(resp.data.length).toBeGreaterThan(0);
            done();
        });
    });
    
    it('Read Enrollment by id /enrollments?id=[number]', (done) => {
        axios.get(`http://localhost:3333/enrollments?id=${enrollmentId}`)
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.data.id).toBe(enrollmentId);
            done();
        });
    });
    
    it('Delete Enrollment /enrollments/delete/:id', (done) => {
        axios.delete(`http://localhost:3333/enrollments/delete/${enrollmentId}`)
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.data.id).toBe(enrollmentId);
            done();
        });
    });
});