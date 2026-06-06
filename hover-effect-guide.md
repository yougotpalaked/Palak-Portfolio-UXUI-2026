# Hover Effect Guide

## How to Control Hover Effects on Project Cards

The portfolio now includes an enhanced hover effect system that allows you to control which project cards display the hover image effect.

### Enhanced Hover Effects

- Smoother transitions with cubic-bezier timing functions
- Improved shadow effects
- Better scaling animations
- More natural opacity transitions

### Disabling Hover Image Effect for Specific Cards

To disable the hover image effect on a specific card, simply add the `no-hover-effect` class to the project-bar div:

```html
<!-- Example: Card WITH hover image effect (default) -->
<div class="project-bar" data-aos="fade-up">
    <div class="project-banner">
        <img src="path/to/image.png" alt="Project Name" class="project-image">
        <img src="path/to/hover-image.png" alt="Project Name Hover" class="project-image-hover">
    </div>
    <!-- rest of the card content -->
</div>

<!-- Example: Card WITHOUT hover image effect -->
<div class="project-bar no-hover-effect" data-aos="fade-up">
    <div class="project-banner">
        <img src="path/to/image.png" alt="Project Name" class="project-image">
        <img src="path/to/hover-image.png" alt="Project Name Hover" class="project-image-hover">
    </div>
    <!-- rest of the card content -->
</div>
```

### Notes

- Cards with the `no-hover-effect` class will still have the elevation and shadow hover effects
- Only the image swap effect is disabled
- You can add or remove this class at any time to control the behavior