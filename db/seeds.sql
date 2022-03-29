-- -Create seeds for system- 
INSERT INTO department(name)
VALUES
    ("Business"),
    ("Engineering"),
    ("Finances"),
    ("Legal D");

INSERT INTO role(title, salary, department_id)
VALUES
    ("Admin", 100000, 1),
    ("Salesperson", 80000, 1),
    ("mechanical Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Finacial advisor", 120000, 3),
    ("Legal Aid", 250000, 4),
    ("Lawyer", 190000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Jane", "Doe", 1, NULL),
    ("Micheal", "Spicer", 2, 1),
    ("Fenado", "Escobar", 3, NULL),
    ("Calvin", "Silk", 4, 3),
    ("Madona", "Red", 5, NULL),
    ("Sharon", "Stone", 6, NULL),
    ("Terry", "Luise", 7, 6);