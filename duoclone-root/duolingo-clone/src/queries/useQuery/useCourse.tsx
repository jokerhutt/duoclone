import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../types/queryKeys";
import type { CourseType } from "../../Types/CourseType";
import { GET_ALL_COURSES } from "../../util/paths";

export function useCourse(id: number | "all") {
  const qc = useQueryClient();

  return useQuery({
    queryKey: qk.courses(id),
    queryFn: async () => {
      if (id === "all") {
        const response = await fetch(GET_ALL_COURSES);
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const courses: CourseType[] = await response.json();
        
        courses.forEach((course) => {
          qc.setQueryData(qk.courses(course.id), course);
        });
        
        return courses;
      }

      const allCourses = qc.getQueryData<CourseType[]>(qk.courses("all"));
      
      if (allCourses) {
        const course = allCourses.find((course) => course.id === id);
        if (course) return course;
      }

      const response = await fetch(GET_ALL_COURSES);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const courses: CourseType[] = await response.json();
      
      courses.forEach((course) => {
        qc.setQueryData(qk.courses(course.id), course);
      });
      
      qc.setQueryData(qk.courses("all"), courses);
      
      const foundCourse = courses.find((course) => course.id === id);
      if (!foundCourse) {
        throw new Error(`Course with id ${id} not found`);
      }
      return foundCourse;
    },
  });
}