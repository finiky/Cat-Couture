import { render, screen } from "@testing-library/react";
import Product from "./Product";

describe("Product", () => {
  test("Renders a product with a discount", () => {
    render(
      <Product
        name="Angel Wings Harness"
        description="The purrrfect accessory to take your kitty to the next level."
        price="$10.00"
        imageName="cat-photo_0000.jpg"
        imageDescription="Wings harness"
        discountType="1"
        discountValue={10}
      />
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Angel Wings Harness"
    );
    expect(screen.getByTestId("product-description")).toHaveTextContent(
      "The purrrfect accessory to take your kitty to the next level."
    );
    expect(screen.getByAltText("Wings harness")).toBeInTheDocument();

    expect(screen.getByText("Price", { exact: false })).toHaveTextContent(
      "$10.00"
    );
    expect(screen.getByRole("button")).toBeEnabled();
    expect(screen.getByTestId("badge")).toBeInTheDocument();
    expect(screen.queryByTestId("badge")).not.toBeNull();
  });

  test("Renders a product with default image", () => {
    render(
      <Product
        name="Angel Wings Harness"
        description="The purrrfect accessory to take your kitty to the next level."
        price="$10.00"
        imageName="cat-photo_0000.jpg"
        imageDescription="Wings harness"
        discountType={null}
        discountValue={null}
      />
    );
    expect(screen.getByAltText("Wings harness")).toBeInTheDocument();
  });

  test("Renders a product with no discount", () => {
    render(
      <Product
        name="Deluxe Carry Bag Orange"
        description="Backpack-style carry bag with dome."
        price="$20.00"
        imageName="cat-photo_0001.jpg"
        imageDescription="Carry Bag Deluxe"
        discountType={null}
        discountValue={null}
      />
    );
    expect(screen.queryByTestId("badge")).toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Deluxe Carry Bag Orange"
    );
    expect(screen.getByTestId("product-description")).toHaveTextContent(
      "Backpack-style carry bag with dome."
    );
    expect(screen.getByAltText("Carry Bag Deluxe")).toBeInTheDocument();

    expect(screen.getByText("Price", { exact: false })).toHaveTextContent(
      "$20.00"
    );
  });
});
