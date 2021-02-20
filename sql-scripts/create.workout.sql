DROP TABLE IF EXISTS workout;

CREATE TABLE IF NOT EXISTS workout (
    workout_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER REFERENCES user(user_id) NOT NULL,
    exercise_id INTEGER REFERENCES exercise(exercise_id) NOT NULL,
    set_number INTEGER,
    num_of_reps INTEGER,
    weight_used INTEGER,
    date_completed TIMESTAMP DEFAULT now(),
    is_active BOOLEAN
);