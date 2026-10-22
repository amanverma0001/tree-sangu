"""
Romantic Fractal Tree Animation with Python Turtle
Inspired by the viral fractal tree animation for Sangu.
Run this script to watch the tree grow branch-by-branch!
"""

import turtle
import time
import random

def setup_canvas():
    screen = turtle.Screen()
    screen.setup(width=720, height=880)
    screen.bgcolor("black")
    screen.title("For Sangu - Always Stay Happy With Me 💖✨")
    screen.tracer(0)
    return screen

def create_turtle():
    t = turtle.Turtle()
    t.shape("turtle")
    t.color("#e63946")
    t.pensize(2)
    t.speed(0)
    return t

def draw_tree(t, screen, branch_len, angle, depth, total_depth=8):
    if depth == 0:
        colors = ["#ffb703", "#fb8500", "#ffbe0b", "#ffd166", "#ff5400"]
        for _ in range(random.randint(2, 3)):
            orig_pos = t.position()
            t.penup()
            t.forward(random.randint(2, 6))
            t.dot(random.randint(6, 9), random.choice(colors))
            t.goto(orig_pos)
            t.pendown()
        screen.update()
        time.sleep(0.002)
        return

    thickness = max(1, int(depth * 0.7))
    t.pensize(thickness)
    
    if depth > 5:
        t.pencolor("#8b1e1e")
    elif depth > 2:
        t.pencolor("#b83030")
    else:
        t.pencolor("#cf4a4a")

    t.forward(branch_len)

    joint_colors = ["#ff9e1b", "#ffaa33", "#ffc300"]
    t.dot(max(3, int(depth * 0.7)), random.choice(joint_colors))
    
    screen.update()
    time.sleep(0.003)

    pos = t.position()
    head = t.heading()

    # Left branch
    t.left(angle)
    draw_tree(t, screen, branch_len * 0.76, angle, depth - 1, total_depth)

    t.penup()
    t.goto(pos)
    t.setheading(head)
    t.pendown()

    # Right branch
    t.right(angle)
    draw_tree(t, screen, branch_len * 0.76, angle, depth - 1, total_depth)

    t.penup()
    t.goto(pos)
    t.setheading(head)
    t.pendown()

def main():
    screen = setup_canvas()
    t = create_turtle()

    # Draw small root base
    t.penup()
    t.goto(0, -210)
    t.pendown()
    t.dot(14, "#b82424")
    t.dot(8, "#ff6b6b")

    # Start drawing tree trunk upwards
    t.setheading(90)
    t.pencolor("#8b1e1e")
    t.pensize(4)

    for _ in range(25):
        t.forward(4)
        screen.update()
        time.sleep(0.01)

    t.dot(6, "#ff9e1b")

    # Draw fractal tree
    draw_tree(t, screen, 75, 28, 8, total_depth=8)

    t.hideturtle()
    screen.update()

    # Write romantic message below the tree
    text_t = turtle.Turtle()
    text_t.hideturtle()
    text_t.penup()
    
    text_t.goto(0, -280)
    text_t.color("#ffe0b2")
    text_t.write("Always Stay Happy with me..", align="center", font=("Georgia", 16, "italic"))

    text_t.goto(0, -325)
    text_t.color("#ff9e2c")
    text_t.write("dear Sangu 💖✨", align="center", font=("Arial", 22, "bold"))

    screen.update()
    screen.mainloop()

if __name__ == "__main__":
    main()
