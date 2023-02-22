from dataclasses import dataclass
from pathlib import Path
from typing import List, Tuple, Union
from PIL import Image, ImageSequence
import base64
import numpy as np
import io

Left, Upper, Right, Lower = int, int, int, int
Box = Tuple[Left, Upper, Right, Lower]
Frames = List[np.ndarray]
ImageArray = List[Image.Image]

@dataclass
class MultiFrameImage:
    fp: Image

    @property
    def im(self):
        return self.fp

    @property
    def frames(self) -> Frames:
        return [
            np.array(frame.copy().convert("RGB"))
            for frame in ImageSequence.Iterator(self.im)
        ]

    def crop_frames(self, box: Box) -> List[np.ndarray]:
        left, upper, right, lower = box
        return [frame[upper:lower, left:right] for frame in self.frames]

    def image_array_from_frames(self, frames: Frames) -> ImageArray:
        return [Image.fromarray(np.uint8(frame)) for frame in frames]

    def crop_to_buffer(self, box: Box, **kwargs) -> io.BytesIO:
        cropped_frames = self.crop_frames(box)
        cropped_images = self.image_array_from_frames(cropped_frames)
        buffer = io.BytesIO()
        cropped_images[0].save(
            buffer,
            save_all=True,
            format="GIF",
            append_images=cropped_images[1:],
            duration=16,
            loop=0,
            **kwargs
        )
        return buffer

    def crop(self, box: Box, **kwargs) -> Image.Image:
        return Image.open(self.crop_to_buffer(box, **kwargs))
