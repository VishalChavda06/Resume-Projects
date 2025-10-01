import React from 'react'


const demoCourses = [
  {
    id: 1,
    name: 'Introduction to React',
    description: 'Learn the basics of React, including components, state, and props.',
    instructor: 'John Doe',
    isNew: true,
  },
  {
    id: 2,
    name: 'Advanced JavaScript',
    description: 'Deep dive into ES6+, closures, async/await, and more.',
    instructor: 'Jane Smith',
    isNew: false,
  },
  {
    id: 3,
    name: 'Web Design Fundamentals',
    description: 'Principles of good web design, color theory, and layout.',
    instructor: 'Emily Johnson',
    isNew: false,
  },
  {
    id: 4,
    name: 'Node.js for Beginners',
    description: 'Server-side JavaScript with Node.js and Express.',
    instructor: 'Michael Brown',
    isNew: true,
  },
  {
    id: 5,
    name: 'Python Programming',
    description: 'Start coding in Python, from variables to OOP.',
    instructor: 'Sarah Lee',
    isNew: false,
  },
  {
    id: 6,
    name: 'Data Structures',
    description: 'Learn about arrays, linked lists, trees, and more.',
    instructor: 'David Kim',
    isNew: false,
  },
  {
    id: 7,
    name: 'Database Basics',
    description: 'Introduction to SQL and NoSQL databases.',
    instructor: 'Olivia Martinez',
    isNew: false,
  },
  {
    id: 8,
    name: 'Machine Learning 101',
    description: 'Fundamentals of machine learning and model building.',
    instructor: 'William Chen',
    isNew: false,
  },
  {
    id: 9,
    name: 'Mobile App Development',
    description: 'Build your first mobile app with React Native.',
    instructor: 'Sophia Wilson',
    isNew: true,
  },
  {
    id: 10,
    name: 'Cybersecurity Essentials',
    description: 'Learn how to protect systems and data from cyber threats.',
    instructor: 'James Anderson',
    isNew: false,
  },
];

// Helper to get initials from instructor name
const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

const CouresPage = () => {
    return (
        <>
            <div className='container mx-auto p-4'>
                <h1 className='text-3xl font-bold mb-8 text-center text-blue-700 drop-shadow'>Course Page</h1>
                <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                  {demoCourses.map(course => (
                    <div
                      key={course.id}
                      className='relative border rounded-xl p-6 shadow-sm bg-white flex flex-col gap-4'
                    >
                      {/* New Badge */}
                      {course.isNew && (
                        <span className='absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow'>NEW</span>
                      )}
                      <h2 className='text-xl font-semibold text-gray-800 mb-1'>{course.name}</h2>
                      <p className='text-gray-600 mb-2'>{course.description}</p>
                      <div className='flex items-center gap-3 mt-auto'>
                        {/* Instructor Avatar */}
                        <div className='w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg shadow-inner'>
                          {getInitials(course.instructor)}
                        </div>
                        <div>
                          <p className='text-sm font-medium text-gray-700'>{course.instructor}</p>
                          <p className='text-xs text-gray-400'>Instructor</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
        </>
    )
}

export default CouresPage