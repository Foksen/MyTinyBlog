package ru.mirea.gateway.filter;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;

@Component
public class MetricsFilter implements Filter {

    private final MeterRegistry meterRegistry;

    private Counter blogVisitsCounter;

    public MetricsFilter(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
        this.blogVisitsCounter = Counter.builder("blog_visits")
                .tag("date", LocalDate.now().toString())
                .register(meterRegistry);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        var request = (HttpServletRequest) servletRequest;

        System.out.println(request.getMethod());
        System.out.println(request.getRequestURI());

        if (HttpMethod.GET.toString().equals(request.getMethod()) && "/posts".equals(request.getRequestURI())) {
            blogVisitsCounter.increment();
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }
}
