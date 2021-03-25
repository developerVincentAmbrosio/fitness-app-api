CREATE TABLE fitness_exercise (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    exercise_type TEXT,
    exercise_name TEXT NOT NULL,
    exercise_desc TEXT NOT NULL,
    is_active BOOLEAN
);