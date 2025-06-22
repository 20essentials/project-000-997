import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Vector3 } from "@/utils/vec";

type Matrix3x3Array = [
  number, number, number,
  number, number, number,
  number, number, number,
];

export class Matrix3x3 {
  constructor(public elements: Matrix3x3Array) {}

  multiply(other: Vector3): Vector3 {
    const [a, b, c, d, e, f, g, h, i] = this.elements;
    const { x, y, z } = other;
    return new Vector3(
      a * x + b * y + c * z,
      d * x + e * y + f * z,
      g * x + h * y + i * z,
    );
  }

  setElements(newElements: Matrix3x3Array) {
    this.elements = newElements;
  }
}

export const useMatrixStore = create(
  combine(
    {
      matrix: new Matrix3x3([
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
      ]),
    },
    (set, get) => ({
      setMatrix: (newElements: Matrix3x3Array) => {
        const matrix = get().matrix;
        matrix.setElements(newElements);
        set({ matrix });
      },
      multiplyWithVector: (vector: Vector3) => {
        return get().matrix.multiply(vector);
      },
    })
  )
);
