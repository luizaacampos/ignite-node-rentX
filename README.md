# Car register

**RF**
- should de able to register a new car.

**RN** 
- should not be able to register a car with an existent license plate.
- car should be register as available (default).
- only admins can register a new car.

# Cars lists

**RF**
- should be able to list all available cars.

**RN**
- user does not need to be logged in.

# car specification register

**RF**
- should be able to register a specification on a car.

**RN**
- should not be able to register a specification on a non-registered car.
- should not be able to register a specification that already exists on a car.
- user should be an admin.

# car pictures register 

**RF**
- should be able to register car picture.

**RNF**
- should be able to use multer to upload files.

**RN**
- user should be able to register more than one picture by car.
- user should be an admin.

# car rental

**RF**
- should be able to register a rent.

**RN**
- the rent should be for at least 24 hours.
- user should not be able to rent two cars at the same time.
- car should not be rent by two users at the same time.
- user should be logged in to rent a car.
- when rented, car status must be unavailable.

# car return 

**RF**
- should be able to return a car.

**RN**
- user should be logged in.
- if car is returned before 24 hours user must be charged daily.
- when returned, car must become available.
- when returned, user must become available.
- when returned, total rent must be calculated.
- if the return is late, a fine must be charged.
- the fine must be charged to the total rent.

# rentals list

**RF**
- should be able to show all user's rentals.

**RN**
- user should be logged in.

