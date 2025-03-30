package org.example;

import org.gradle.api.JavaVersion;
import org.gradle.api.Project;
import org.gradle.api.Plugin;
import org.gradle.api.plugins.JavaPluginExtension;
import org.gradle.api.tasks.compile.JavaCompile;

/**
 * A custom Gradle plugin for configuring Quarkus projects.
 */
public class BuildLogicPlugin implements Plugin<Project> {
    @Override
    public void apply(Project project) {
        // Apply Java and Quarkus plugins
        project.getPlugins().apply("java");
        project.getPlugins().apply("io.quarkus");

        // Add repositories
        project.getRepositories().mavenCentral();
        project.getRepositories().mavenLocal();

        // Add dependencies

        // Read properties from gradle.properties
        String quarkusPlatformGroupId = (String) project.findProperty("quarkusPlatformGroupId");
        String quarkusPlatformArtifactId = (String) project.findProperty("quarkusPlatformArtifactId");
        String quarkusPlatformVersion = (String) project.findProperty("quarkusPlatformVersion");

        // Add dependencies
        project.getDependencies().add("implementation",
                project.getDependencies().platform(
                        String.format("%s:%s:%s", quarkusPlatformGroupId, quarkusPlatformArtifactId, quarkusPlatformVersion)
                )
        );
        project.getDependencies().add("implementation", "io.quarkus:quarkus-arc");
        project.getDependencies().add("implementation", "io.quarkus:quarkus-rest");
        project.getDependencies().add("testImplementation", "io.quarkus:quarkus-junit5");
        project.getDependencies().add("testImplementation", "io.rest-assured:rest-assured");

        // Set group and version
        project.setGroup("org.acme");
        project.setVersion("1.0.0-SNAPSHOT");

        // Set Java compatibility
        project.getExtensions().configure(JavaPluginExtension.class, java -> {
            java.setSourceCompatibility(JavaVersion.VERSION_21);
            java.setTargetCompatibility(JavaVersion.VERSION_21);
        });

        // Compiler settings
        project.getTasks().withType(JavaCompile.class).configureEach(task -> {
            task.getOptions().setEncoding("UTF-8");
            task.getOptions().getCompilerArgs().add("-parameters");
        });

        // Test configurations
        project.getTasks().withType(org.gradle.api.tasks.testing.Test.class).configureEach(test -> {
            test.systemProperty("java.util.logging.manager", "org.jboss.logmanager.LogManager");
        });

        // Register a sample task for verification
        project.getTasks().register("greeting", task -> {
            task.doLast(s -> System.out.println("Hello from plugin 'org.example.cartv'"));
        });
    }
}
