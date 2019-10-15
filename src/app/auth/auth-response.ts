export interface AuthResponse {
    user: {
        id: number,
        _id: string,
        student_name: string,
        student_dept: string,
        student_level: string,
        mobile_no: number,
        success: boolean,
        msg: string,
        access_token: string,
        expires_in: number
    };
    access_token: string;
    expires_in: number;
}
