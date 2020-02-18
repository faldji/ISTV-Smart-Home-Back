FROM openjdk:12

#DockerFile config for tp-prog-comp images

ENV PROJECT_HOME /home/smart-home
ENV SRC_FILE ./target/smart-home-0.0.1.jar
WORKDIR $PROJECT_HOME
COPY $SRC_FILE $PROJECT_HOME/main.jar
RUN chmod -R 777 $PROJECT_HOME
EXPOSE 8080
ENTRYPOINT java -jar ./main.jar