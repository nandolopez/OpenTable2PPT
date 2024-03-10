import { IBind } from "./IBind";

export interface IExcelConfig {
  // Settings name
  Name: string;

  //Sheet where take the data
  Sheet: string;

  //Path of PPTX for use as template
  TemplatePPTX: string;

  //Initial row for do the loop
  InitialRow: number;

  //Final row for finish the loop
  FinalRow: number;

  //Column with notes for use as teleprompter
  NotesColumn: string;

  //Option for export the final PPTX in same directory of XLSX
  SameDirectory: boolean;

  // If option of same directory is false, final path of final PPTX
  PPTXFinalPath: string;
  
  // For make field binding or map text
  BindingColumns: IBind[];

  // For set the configuration which column is who say with Slide replicate
  PPTColumns: IBind[];

  /* 
    Configuration for associate XLSX column with slides
    Example:
      content of Column A4 "slide full" = replicate slide 1
      content of Column A5 "slide with camera" = replicate slide 2
      ...
  */
  SlideColumn: string;
}
