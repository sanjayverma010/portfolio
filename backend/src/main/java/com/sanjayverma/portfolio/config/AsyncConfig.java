package com.sanjayverma.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {

    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        
        // Core pool size = minimum number of threads
        executor.setCorePoolSize(5);
        
        // Maximum number of threads in the pool
        executor.setMaxPoolSize(10);
        
        // Queue capacity before new threads are created
        executor.setQueueCapacity(50);
        
        // Thread name prefix (helps in debugging async calls)
        executor.setThreadNamePrefix("PortfolioAsync-");
        
        // Ensures the executor shuts down gracefully
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setAwaitTerminationSeconds(30);
        
        executor.initialize();
        return executor;
    }
}
