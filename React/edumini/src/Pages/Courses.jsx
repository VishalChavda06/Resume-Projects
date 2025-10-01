import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "../components/ui/card";
import Sidebar from "../components/ui/layout/Sidebar";
import Header from "../components/ui/layout/Header";
import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

export default function Courses() {
  const [course, setCourses] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  useEffect(() => {
    if (course.length > 0) {
      localStorage.setItem("courses", JSON.stringify(course));
    }
  }, [course]);

  const handleAddCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now(),
      ...form,
    };
    setCourses([...course, newCourse]);
    setForm({ name: "", description: "" });
  };

  const handleDeleteCourse = (id) => {
    setCourses(course.filter((c) => c.id !== id));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-muted/40">
        <Header />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">📘 Manage Courses / Batches</h1>

          <form
            onSubmit={handleAddCourse}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-xl mb-10 space-y-5"
          >
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Course Name
              </Label>
              <Input
                placeholder="e.g. Web Development"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Description
              </Label>
              <Input
                placeholder="e.g. Learn HTML, CSS, JS, React"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            <Button type="submit" className="w-full">
              ➕ Add Course
            </Button>
          </form>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No courses added yet.
              </p>
            ) : (
              course.map((course) => (
                <Card
                  key={course.id}
                  className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all h-48"
                >
                  <CardHeader>
                    <CardTitle className="text-xl truncate">{course.name}</CardTitle>
                    <CardDescription className="text-sm mt-1 text-muted-foreground line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteCourse(course.id)}
                      className="w-full"
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
