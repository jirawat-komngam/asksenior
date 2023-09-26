build-docker:
	mvnw install
	docker build --build-arg JAR_FILE=target/*.jar -t dmitdockerhub/user-service:latest .

push-docker:
	docker push dmitdockerhub/user-service:latest
