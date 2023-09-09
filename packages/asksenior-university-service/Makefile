build-docker:
	mvnw install
	docker build --build-arg JAR_FILE=target/*.jar -t asksenior/asksenior-university-service .