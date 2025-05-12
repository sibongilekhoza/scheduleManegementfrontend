import { Module } from "./module";

export class Course {
    courseId!:number;
    courseName!:string;
    courseCode!: string;
    courseLevel!: string;
    courseDescription!:string;
    subjectList!:Module
}
