build-docker:
	mvnw install
	docker build --build-arg JAR_FILE=target/*.jar -t dmitdockerhub/post-service:latest .

push-docker:
	docker push dmitdockerhub/post-service:latest
