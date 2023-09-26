build-docker:
	mvnw install
	docker build --build-arg JAR_FILE=target/*.jar -t dmitdockerhub/university-service:latest .

push-docker:
	docker push dmitdockerhub/university-service:latest
